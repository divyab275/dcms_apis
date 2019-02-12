
"use strict";

//id is the primary key and it is used as drishti/dhwani id to create QR codes

module.exports = function(sequelize, DataTypes) {
    var StudentReunion = sequelize.define("studentReunion", {
        gid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        studentID: {
            type: DataTypes.STRING
        }
    },{
        classMethods: {
            associate: function(models) {
                models.studentReunion.belongsTo(models.student,{foreignKey:'studentID',targetKey:'uid'});
                models.studentReunion.belongsTo(models.reunion,{foreignKey:'gid',targetKey:'gid'});
            }
        }

    });

    return StudentReunion;
};
