import Input from './Input';
import Select from './Select';

export default function TaskForm({ children, data, onSubmit }) {
	return (
		<form id='task-form' onSubmit={onSubmit}>
			<Input type='text' label='Task' id='task_name' name='task_name' />

			<Input
				textarea
				label='Description'
				id='task_description'
				name='task_description'
			/>
			<Select label='Priority' id='task_priority' name='task_priority'>
				<option value='low'>Low</option>
				<option value='medium'>Medium</option>
				<option value='high'>High</option>
			</Select>

			<Select label='Assigned To' id='task_assignee' name='task_assignee'>
				<option value='user'>User</option>
			</Select>

			<Input
				type='hidden'
				value='todo'
				id='task_status'
				name='task_status'
			/>

			<div className='flex flex-col md:flex-row gap-3 justify-end'>
				{children}
			</div>
		</form>
	);
}
