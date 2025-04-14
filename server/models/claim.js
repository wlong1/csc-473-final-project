module.exports = (sequelize, DataTypes) => {
    const Claim = sequelize.define('Claim', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
                },
            onDelete: 'CASCADE'
        },
        listingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'listing',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        message: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
            defaultValue: 'pending',
            allowNull: false
        }
        }, {
            tableName: 'claim',
            timestamps: true
    });


    Claim.associate = function(models) {
        Claim.belongsTo(models.User, { foreignKey: 'userId' });
        Claim.belongsTo(models.Listing, { foreignKey: 'listingId' });
    };
    
    return Claim;
};