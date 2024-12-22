
// import { UserModel } from "models/index.js" ;
import { UserModel } from "../models/index.js" ;

export const userService = {} ;



userService.findOne = async(criteria) => await UserModel.findOne(criteria);

userService.create = async(payload) => await UserModel.create(payload);

// userService.updateUser = async (condition, updates) => {
//     const [updatedCount] = await UserModel.update(updates, { where: condition });
//     if(updatedCount) {
//         return UserModel.findOne({ where: condition }); 
//     }
//     return null;  
// };
