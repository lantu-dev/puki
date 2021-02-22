import auth from './auth/index';

// export default {
//   'POST /api/': (req: any, res: any) => {
//     const { method, params } = req.body;
//     console.log('method: ', method);
//     console.log('params: ', params);
//
//     //@ts-ignore
//     const [, Module, Service, Method]: string[] = /^(\w+)\/(\w+)\.(\w+)$/.exec(
//       method,
//     );
//
//     let reply = {
//       err: {
//         message: 'mock service unfind',
//         status: 3,
//       },
//     };
//     switch (Module) {
//       case 'auth':
//         try {
//           //@ts-ignore
//           reply = auth[Service][Method](params);
//         } catch (err) {
//           console.log(err);
//         }
//         break;
//     }
//
//     res.send(reply).end();
//   },
// };
