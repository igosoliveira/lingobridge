import mongoose from 'mongoose';

class MongooseDriver {
  static async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_DATABASE_URL as string);
      console.log('Conexão com o MongoDB estabelecida');
    } catch (error) {
      console.error('Erro ao conectar ao MongoDB:', error);
    }
  }

  static async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('Desconexão com o MongoDB estabelecida');
    } catch (error) {
      console.error('Erro ao desconectar do MongoDB:', error);
    }
  }
}

export default MongooseDriver;
