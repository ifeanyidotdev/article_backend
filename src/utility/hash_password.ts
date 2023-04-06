import argon from "argon2";
async function hash_password(password: string) {
	const hash = await argon.hash(password);
	return hash;
}

async function verifyPassword(hashed: string, password: string) {
	const verify = await argon.verify(hashed, password);
	return verify;
}

export { hash_password, verifyPassword };
