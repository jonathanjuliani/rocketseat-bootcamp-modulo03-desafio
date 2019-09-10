import { Op } from 'sequelize';
import { isBefore, startOfDay, endOfDay, parseISO } from 'date-fns';

import User from '../models/User';
import MeetApps from '../models/MeetApps';
import validators from '../validators';

class MeetAppsController {
  async store(req, res) {
    const meetapp = { ...req.body };

    if (!(await validators.validateMeetStore(meetapp))) {
      return res.status(400).json({
        error: 'Ocorreu um erro na validação dos campos, tente novamente.',
      });
    }

    const parsedDate = parseISO(meetapp.date);

    if (isBefore(parsedDate, new Date())) {
      return res.status(400).json({ error: 'Data inválida para o evento.' });
    }

    const user_id = req.userId;
    const includedMeet = await MeetApps.create({
      ...meetapp,
      user_id,
    });

    return res.json(includedMeet);
  }

  async index(req, res) {
    const where = {};
    const page = req.query.page || 1;

    if (req.query.date) {
      const searchDate = parseISO(req.query.date);
      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    const meets = await MeetApps.findAll({
      where,
      include: [User],
      limit: 10,
      offset: 10 * page - 10,
    });

    return res.json(meets);
  }

  async update(req, res) {
    const meetToUpdate = { ...req.body };
    const user_id = req.userId;

    if (!(await validators.validateMeetUpdate(meetToUpdate))) {
      return res.status(400).json({
        error: 'Ocorreu um erro na validação dos campos, tente novamente.',
      });
    }

    const existingMeet = await MeetApps.findByPk(req.params.id);

    if (existingMeet.user_id !== user_id) {
      return res.status(401);
    }

    const parsedDate = parseISO(meetToUpdate.date);
    if (isBefore(parsedDate, new Date())) {
      return res.status(400).json({ error: 'Data inválida.' });
    }

    if (existingMeet.past) {
      return res
        .status(401)
        .json({ error: 'Não autorizado à atualizar eventos passados.' });
    }

    await existingMeet.update(meetToUpdate);
    return res.json(existingMeet);
  }

  async delete(req, res) {
    const user_id = req.userId;
    const existingMeet = await MeetApps.findByPk(req.params.id);

    if (existingMeet.user_id !== user_id) {
      return res.status(401);
    }

    if (existingMeet.past) {
      return res
        .status(401)
        .json({ error: 'Não autorizado à atualizar eventos passados.' });
    }

    await existingMeet.destroy();
    return res.send();
  }
}

export default new MeetAppsController();
