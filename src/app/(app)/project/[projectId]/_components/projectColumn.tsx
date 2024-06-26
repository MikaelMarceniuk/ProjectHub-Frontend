'use client'

import ColumnType from '@/@types/column'
import CardSheet from './cardSheet'
import { useQuery } from '@tanstack/react-query'
import getCardsByColumnId from '@/api/getCardsByColumnId'
import TaskCard from './taskCard'
import { useDroppable } from '@dnd-kit/core'
import { ScrollArea } from '@/components/shadcn/scroll-area'

const ProjectColumn: React.FC<ColumnType> = ({ id, name }) => {
	const { setNodeRef } = useDroppable({
		id: `column-${id}`,
	})

	const { data } = useQuery({
		queryKey: ['column', { id }],
		queryFn: async () => {
			const apiResp = await getCardsByColumnId({ columnId: id })

			if (apiResp.isSuccess) return apiResp.data

			// TODO Send a message error
			return Promise.reject()
		},
	})

	return (
		<ul className='w-full rounded border bg-black p-2'>
			<div className='flex items-center justify-between'>
				<div>
					<span className='text-lg font-bold uppercase'>{name}</span>
				</div>
				<CardSheet type='CREATE' columnId={id} />
			</div>
			{/* TODO Create Skeleton and error card */}
			<ScrollArea className='h-[660px]' ref={setNodeRef}>
				{data &&
					data.map((c) => (
						// TODO Solve this error
						// @ts-ignore
						<TaskCard key={c.id} {...c} />
					))}
			</ScrollArea>
		</ul>
	)
}

export default ProjectColumn
