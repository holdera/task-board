import Input from './Input';
import Select from './Select';

export default function TaskForm({ children, data, onSubmit }) {
	function formSubmitHandler(e) {
		e.preventDefault();
		const formInputs = new FormData(e.target);
		const formData = Object.fromEntries(formInputs);

		onSubmit({ ...formData });
	}

	return (
		<form id='task-form' onSubmit={formSubmitHandler}>
			<Input
				type='text'
				label='Task'
				id='task_name'
				name='task_name'
				defaultValue={data ? data.task_name : ''}
			/>

			<Input
				textarea
				label='Description'
				id='task_description'
				name='task_description'
				defaultValue={data ? data.task_description : ''}
			/>
			<Select
				label='Priority'
				id='task_priority'
				name='task_priority'
				defaultValue={data ? data.task_priority : ''}
			>
				<option value='low'>Low</option>
				<option value='medium'>Medium</option>
				<option value='high'>High</option>
			</Select>

			<Select
				label='Assigned To'
				id='task_assignee'
				name='task_assignee'
				defaultValue={data ? data.task_assignee : ''}
			>
				<option value='user'>User</option>
			</Select>

			<Input
				type='hidden'
				value='todo'
				id='task_status'
				name='task_status'
				//defaultValue={data.task_status ?? ''}
			/>

			<div className='flex flex-col md:flex-row gap-3 justify-end'>
				{children}
			</div>
		</form>
	);
}
