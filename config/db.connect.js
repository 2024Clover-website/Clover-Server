import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

// 클라이언트를 먼저 연결합니다.
client.connect().then(() => {
    console.log('Connected to the database');
}).catch(error => {
    console.error('Error connecting to the database:', error);
    process.exit(1); // 연결 실패 시 프로세스 종료
});

// 연결된 클라이언트를 사용하여 데이터베이스에 연결하는 함수
export async function connectToDatabase() {
    return client.db('clover');
}