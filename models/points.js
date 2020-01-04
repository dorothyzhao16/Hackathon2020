module.exports = (sequelize, DataTypes) => {
    const points = sequelize.define('points', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },{
        timestamps: false,
        logging: false
    });
    points.associate = function(models) {
        // associations
    };
    return points;
};