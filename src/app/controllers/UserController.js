import User from '../models/User';

import validators from '../validators';

class UserController {
  async store(req, res) {
    if (!(await validators.validateUserStore(req.body))) {
      return res.status(400).json({
        error: 'Ocorreu um erro na validação dos campos, tente novamente.',
      });
    }
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }

    const { id, name, email, provider } = await User.create(req.body);
    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    if (!(await validators.validateUserUpdate(req.body))) {
      return res.status(400).json({
        error: 'Ocorreu um erro na validação dos campos, tente novamente.',
      });
    }

    const { id: userId } = req.user;
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(userId);

    if (email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });

      if (emailExists) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
      }
      // aqui seria legal enviar um email de validacao para o novo email do usuario
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha atual incorreta.' });
    }

    const { id, name, provider } = await user.update(req.body);
    return res.json({ id, name, email, provider });
  }
}

export default new UserController();
