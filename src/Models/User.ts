import mongoose from "mongoose";
const { Schema } = mongoose;

import { v4 as uuidv4 } from "uuid";

const userSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId, // UUID
	discriminator: String, // Discriminator
	username: String, // username of the user
	email: String, // email of the user
	password: String, // Hashed password
	posts: [
		{
			_id: mongoose.Schema.Types.ObjectId, // UUID
			discriminator: String, // Unique ID of the post
			postID: Number, // Rank in total posts
			hasImage: Boolean, // Does the post have an image?
			hasText: Boolean, // Does the post have text?
			image: String, // Image contained by the post
			text: String, // The text contained by the post
			timestamp: Number, // The timestamp of the comment
			comments: [
				{
					_id: mongoose.Schema.Types.ObjectId, // UUID
					poster: String, // Discriminator of the poster
					commentID: Number, // Rank in total comments
					text: String, // The contents of the comment
					timestamp: Number, // Timestamp for when it was posted
					image: String, // Image contained in the comment, if any
					hasImage: Boolean, // Does the comment have an image?
					hasText: Boolean, // Does the comment have text?
				},
			],
		},
	],
});

export const User = mongoose.model("User", userSchema);
