
"use strict";

//id is the primary key and it is used as drishti/dhwani id to create QR codes

module.exports = function(sequelize, DataTypes) {
    var Reunion = sequelize.define("reunion", {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        gid: {
            //Generate this
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        creatorID: {
            type: DataTypes.STRING,
            //defaultValue: 0
        }
    },
    {
        classMethods: {
            associate: function(models) {
                models.reunion.belongsTo(models.student,{foreignKey:'creatorID',targetKey:'uid'})
                
            }
        }

    }
    );

    return Reunion;
};
