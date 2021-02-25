import auth from './auth/index';
import events from './events/index';

export default {
  'POST /api/': (req: any, res: any) => {
    const { method, params } = req.body;

    const [, Module, Service, Method] = /^(\w+)\/(\w+)\.(\w+)$/.exec(
      method,
    ) as string[];

    console.log('Module: ', Module);
    console.log('Service: ', Service);
    console.log('Method: ', Method);
    console.log('params: ', params);

    let reply = {
      err: {
        message: 'mock service unfind',
        status: 3,
      },
    };
    switch (Module) {
      case 'auth':
        try {
          //@ts-ignore
          reply = auth[Service][Method](params);
        } catch (err) {
          console.log(err);
        }
        break;
      case 'events':
        try {
          //@ts-ignore
          reply = events[Service][Method](params);
        } catch (err) {
          console.log(err);
        }
        break;
    }
    console.log('reply: ', reply);
    res.send({ result: reply }).end();
  },
};
