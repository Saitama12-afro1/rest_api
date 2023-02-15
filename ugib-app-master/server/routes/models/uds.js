const { Op, Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
class UdsMeta extends Model {}

UdsMeta.init({
    uniq_id: {
        type: DataTypes.STRING(200), 
        autoIncrement: true,
        primaryKey: true,
    },
    stor_folder: {
        type:DataTypes.STRING(500)
    },
    obj_assoc_inv_nums:{ type:DataTypes.STRING(500)
    },
    obj_authors:{ type:DataTypes.STRING(500)
    },
    obj_name:{ type:DataTypes.STRING(500)
    },
    obj_year:{ type:DataTypes.STRING(500)
    },
    path_cloud:{ type:DataTypes.STRING(500)
    },
    oid:{ type:DataTypes.INTEGER
    }

},
    {tableName: 'uds_for_bascet',
    sequelize,
    timestamps: false
});

module.exports = {UdsMeta}