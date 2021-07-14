import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../Models/User";

const key = "secret";

export const CreateUser = (req, res) => {
	User.find({ email: req.body.email.replace(/\s+/g, "") })
		.exec()
		.then((user) => {
			if (user.length >= 1) {
				return res.status(409).json({ message: "Mail already exists." });
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					// Store hash in your password DB.
					if (err) {
						return res
							.status(404)
							.json({ message: "user creation failed :(", error: err });
					} else {
						const _new_user = new User({
							_id: mongoose.Types.ObjectId(), // UUID
							discriminator: uuidv4(), // Discriminator
							username: req.body.username.replace(/\s+/g, ""), // username of the user
							email: req.body.email.replace(/\s+/g, ""), // email of the user
							password: hash, // Hashed password
							posts: [], // Posts array, unpopulated for now.
						});

						_new_user
							.save()
							.then((result) => {
								return res.status(200).json({ message: "user created :)" });
							})
							.catch((err) => {
								return res
									.status(404)
									.json({ message: "user creation failed :(", error: err });
							});
					}
				});
			}
		});
};

export const LoginUser = (req, res) => {
	User.find({ email: req.body.email.replace(/\s+/g, "") })
		.exec()
		.then((user) => {
			if (user.length < 1) {
				return res.status(401).json({ message: "Auth Failed." });
			} else {
				bcrypt.compare(
					req.body.password,
					user[0].password,
					(hashing_err, hashing_result) => {
						if (hashing_result != true) {
							return res
								.status(401)
								.json({ message: "Auth Failed.", error: hashing_err });
						} else {
							const token = jwt.sign(
								{
									email: user[0].email,
									userID: user[0].discriminator,
								},
								key,
								{
									expiresIn: "1h",
								},
							);
							return res.status(200).json({
								message: "Auth successful.",
								id: user[0].id,
								token: token,
							});
						}
					},
				);
			}
		})
		.catch((err) => {
			return res.status(500).json({ message: "Auth Failed.", error: err });
		});
};

// broken, TODO: FIX
export const DeleteUser = (req, res) => {
	User.find({ _id: req.body.id.replace(/\s+/g, "") })
		.exec()
		.then((user) => {
			bcrypt.compare(
				req.body.password,
				user[0].password,
				(hashing_err, hashing_result) => {
					if (hashing_result != true) {
						return res
							.status(500)
							.json({ message: "User deletion failed.", error: hashing_err });
					} else {
						if (user.length < 1) {
							return res.status(404).json({ message: "User doesn't exist." });
						} else {
							User.findOneAndDelete({ _id: req.body.id })
								.exec()
								.then((result) => {
									return res.status(200).json({ message: "User deleted." });
								})
								.catch((err) => {
									return res.status(500).json({
										message: "User deletion failed.",
										error: err,
									});
								});
						}
					}
				},
			);
		})
		.catch((err) => {
			return res.status(500).json({
				message: "User deletion failed.",
				error: err,
			});
		});
};
