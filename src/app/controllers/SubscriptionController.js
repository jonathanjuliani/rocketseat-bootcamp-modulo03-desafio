import { Op } from 'sequelize';
import User from '../models/User';
import MeetApps from '../models/MeetApps';
import Subscription from '../models/Subscription';
import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = Subscription.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: MeetApps,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          required: true,
        },
      ],
      order: [[MeetApps, 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meet = await MeetApps.findByPk(req.params.meetId, {
      include: [User],
    });

    if (meet.user_id !== req.userId) {
      return res.status(400).json({
        error: 'Não pode se inscrever em um MeetApp organizado por você mesmo.',
      });
    }

    if (meet.past) {
      return res
        .status(400)
        .json({ error: 'Não pode se inscrever em eventos passados.' });
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: MeetApps,
          required: true,
          where: {
            date: meet.date,
          },
        },
      ],
    });

    if (checkDate) {
      return res.status(401).json({
        error:
          'Não pode se inscrever em mais de um MeetApp que ocorre no mesmo dia e horário.',
      });
    }

    const subscription = await Subscription.create({
      user_id: user.id,
      meetapp_id: meet.id,
    });

    await Queue.add(SubscriptionMail.key, {
      meet,
      user,
    });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
