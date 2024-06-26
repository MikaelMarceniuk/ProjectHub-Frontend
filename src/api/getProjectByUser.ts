'use server'

import db from '@/db'
import { ProjectSchema } from '@/db/schema'
import { and, eq, like } from 'drizzle-orm'

type getProjectByUserParams = {
	userId: string
	query: string | null
}

const getProjectByUser = async ({ userId, query }: getProjectByUserParams) => {
	try {
		// TODO Fix userId not in session after f5
		// TODO Make filter by lower project name https://orm.drizzle.team/learn/guides/unique-case-insensitive-email#postgresql
		const dbResp = await db
			.select()
			.from(ProjectSchema)
			.where(
				and(
					eq(ProjectSchema.ownerId, userId),
					like(ProjectSchema.name, `%${query || ''}%`),
				),
			)

		return {
			isSuccess: true,
			data: dbResp,
		}
	} catch (e) {
		console.log('getProjectByUser/Error: ', e)
		return {
			isSuccess: false,
			message: 'Error in creating user.',
		}
	}
}

export default getProjectByUser
