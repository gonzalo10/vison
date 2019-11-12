const Model = require('./model');
const ModelType = require('./modelType');
const User = require('./user');
const UserType = require('./userType');
const Sentiment = require('./sentimentAnalysis');
const Entity = require('./entitiesAnalysis');

const applyDbRelations = () => {
	Model.belongsTo(ModelType, { constraints: true, onDelete: 'CASCADE' });
	Model.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
	Sentiment.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
	Sentiment.belongsTo(Model, { constraints: true, onDelete: 'CASCADE' });
	Entity.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
	Entity.belongsTo(Model, { constraints: true, onDelete: 'CASCADE' });
	ModelType.hasMany(Model);
	UserType.hasMany(User);
	User.belongsTo(UserType);
	User.hasMany(Model);
	User.hasMany(Sentiment);
	User.hasMany(Entity);
};

module.exports = applyDbRelations;
