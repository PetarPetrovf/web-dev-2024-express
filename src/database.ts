import { Sequelize } from 'sequelize';
import { UserModel } from './user/user';
import { UniversityModel } from './university/university';
import { SubjectModel } from './subject/subject';  

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite', 
});

export const db = {
    sequelize,
    Sequelize,
    models: {
        User: UserModel(sequelize),
        University: UniversityModel(sequelize),
        Subject: SubjectModel(sequelize),  
    },
};

db.models.User.belongsTo(db.models.University, {
    foreignKey: 'universityId',
    as: 'university',
});

db.models.University.hasMany(db.models.User, {
    foreignKey: 'universityId',
    as: 'users',
});


db.models.User.belongsToMany(db.models.Subject, {
    through: 'user_subjects',  
    foreignKey: 'userId',      
    otherKey: 'subjectId',     
    as: 'subjects',           
});

db.models.Subject.belongsToMany(db.models.User, {
    through: 'user_subjects', 
    foreignKey: 'subjectId',   
    otherKey: 'userId',        
    as: 'users',               
});

export default db;

