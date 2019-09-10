import MeetApps from '../models/MeetApps';

class OrganizingController {
  async index(req, res) {
    const meets = await MeetApps.findAll({ where: { user_id: req.userId } });

    return res.json(meets);
  }
}

export default new OrganizingController();
