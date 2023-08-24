import crypto from "crypto";

export default class UUID {

	static create () {
		return crypto.randomUUID();
	}
}