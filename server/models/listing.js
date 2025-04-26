module.exports = (sequelize, DataTypes) => {
    const Listing = sequelize.define('Listing', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        lostDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        imagePath: {
            type: DataTypes.STRING,
            allowNull: true
        }
        }, {
            tableName: 'listing',
            timestamps: true
    });


    Listing.associate = function(models) {
        Listing.hasMany(models.Claim, { foreignKey: 'listingId' });
    }; 

    return Listing;
};