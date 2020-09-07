import bcrypt from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        passwordHash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.passwordHash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.UserActive, { foreignKey: 'userId', as: 'Actives' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.passwordHash);
  }
}

export default User;
