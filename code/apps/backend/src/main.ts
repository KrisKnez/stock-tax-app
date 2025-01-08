import { bootstrap } from './bootstrap';

bootstrap().then((app) => app.listen(process.env.PORT ?? 3000));
