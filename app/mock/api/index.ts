import auth from './auth/index';
import events from './events/index';

const serve = {
  auth,
  events,
};

export default {
  'POST /api/': (req: any, res: any) => {
    const { method, params } = req.body;

    const [, Module, Service, Method] = /^(\w+)\/(\w+)\.(\w+)$/.exec(
      method,
    ) as string[];

    let result = {
      err: {
        message: 'mock service unfind',
        status: 3,
      },
    };
    try {
      //@ts-ignore
      result = serve[Module][Service][Method](params);
    } catch (err) {
      console.log(err);
    }
    res.send({ result }).end();

    console.log('Module: ', Module);
    console.log('Service: ', Service);
    console.log('Method: ', Method);
    console.log('params: ', params);
    console.log('result: ', result);
  },
};
