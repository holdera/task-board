import Input from './Input';
import Modal from '@/components/Modal';
import Select from './Select';

export default function AddTaskForm({ onClose }) {
	function handleAddTask(e) {
		e.preventDefault();
	}

	return (
		<Modal onClose={onClose}>
			<form onSubmit={handleAddTask} noValidate>
				<Input type='text' label='Task' id='task' name='task' />

				<Input textarea label='Description' id='desc' name='desc' />
				<Select label='Priority' id='priority' name='priority'>
					<option value='low'>Low</option>
					<option value='medium'>Medium</option>
					<option value='high'>High</option>
				</Select>

				<Select label='Assigned To' id='assignees' name='assignees'>
					<option value='user'>User</option>
				</Select>

				<button className='bg-main mt-3 py-1.5 px-3 rounded-lg text-white'>
					Add New Task
				</button>
			</form>
		</Modal>
	);
}
