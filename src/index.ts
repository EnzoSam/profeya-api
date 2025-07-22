import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

import 'reflect-metadata';
import express from 'express';
//import { container } from './ioc/dependency-container';
import { IDbContextToken } from '@core/domain/repositories/db-context.interface';
import { dependencyContainer } from './ioc/dependency-container';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//const dbContext = dependencyContainer.resolve<TypeORMDbContext>(IDbContextToken);


    const authRoutes = require('./modules/auth/api/routes/auth.routes').default;
    app.use('/auth', authRoutes);

    

    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
/*
dbContext.initialize()
  .then(() => {
    // Importa las rutas DESPUÉS de inicializar la base de datos
    const authRoutes = require('./modules/auth/api/routes/auth.routes').default;
    app.use('/auth', authRoutes);

    

    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al inicializar la base de datos', err);
    process.exit(1);
  }); */