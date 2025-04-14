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
        foundDate: {
            type: DataTypes.DATE,
            allowNull: false
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