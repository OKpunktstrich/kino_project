import {Schema, model, connect} from 'mongoose';

interface IFavorite {
    id: number;
}

const favoriteSchema = new Schema<IFavorite>({
    id: {type: Number, required: true, unique: true }
});

export const Favorite = model<IFavorite>('Favorite', favoriteSchema);