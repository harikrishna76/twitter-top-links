import { createToken } from '../../passport';
import BaseController from '../utils/BaseController';
import TweetsController from '../tweets/controller';
import Service from './service';

class Controller extends BaseController {
  constructor() {
    super(Service);
    this.allowedQueryParams = ['', 'name'];
  }

  authenticate = async (req, res) => {
    try {
      const profile = req.user;
      const user = await this.findOrCreate(profile);
      if (user.errors) {
        this.sendErrors(res, user.errors);
      } else {
        const token = createToken({ _id: user._id });
        TweetsController.generateTweets({
          ...user._doc,
          token: profile.token,
          tokenSecret: profile.tokenSecret,
        });
        res.redirect(`/authenticate/${token}`);
      }
    } catch (e) {
      res.status(500).send(e);
    }
  };

  findOrCreate = async details => {
    const user = await Service.model.findOne({ id: details.id });
    if (!user) {
      const newUser = await Service.createDoc({
        ...details,
        profile_image_url_https: details._json.profile_image_url_https,
      });
      return newUser;
    }
    return user;
  };

  getUserDetails = (req, res) => {
    if (req.user) {
      this.sendData(res, this.getSharableUserDataWithToken(req.user, false));
    } else {
      this.sendErrors(res, { message: 'Unathorized' }, 401);
    }
  };

  getSharableUserDataWithToken = (user, setToken = true) => {
    const sharableData = {};
    Service.sharableFields.forEach(key => {
      sharableData[key] = user[key];
    });
    if (setToken) {
      sharableData.authorization = createToken({
        _id: user._id,
      });
    }
    return sharableData;
  };
}

export default new Controller();
