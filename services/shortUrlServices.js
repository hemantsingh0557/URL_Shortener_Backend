import { ShortURLModel } from "../models/index.js";

export const shortUrlServices = {} ;


shortUrlServices.findOne = async(criteria) => ShortURLModel.findOne(criteria) ; 

shortUrlServices.create = async(payload) => ShortURLModel.create(payload) ;

shortUrlServices.update = async(criteria , payload) => ShortURLModel.findOneAndUpdate(criteria, payload, { new: true });   