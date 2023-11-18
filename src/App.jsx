import './App.css';
import { useEffect, useState } from 'react';
import {
	Button,
	Container,
	Form,
	InputGroup,
	Row,
	Pagination,
} from 'react-bootstrap';
import NoticeCard from './components/NoticeCard';

const baseURL = new URL(
	"http://localhost:8080/api/noticia/noticias/"
);

function App() {
	const [data, setData] = useState([]);
	const [query, setQuery] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(baseURL);
				const res = await response.json();
				setData(res);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const q = document.getElementById('queri').value;
		try {
			setQuery(q);
			baseURL.searchParams.set('ciudad', q);
			const response = await fetch(baseURL);
			const res = await response.json();
			setData(res);
		} catch (error) {
			console.error(error);
		}
	};

	const handleNext = async () => {
		try {
			if (query) {
				baseURL.searchParams.set('ciudad', query);
			}
			baseURL.searchParams.set('page', data.nextPage);
			const response = await fetch(baseURL);
			const res = await response.json();
			setData(res);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="App">
			<h1 style={{ textAlign: 'center' }}>NOTICIAS</h1>
			<Container>
				<Row>
					<Form onSubmit={handleSubmit} id="form">
						<InputGroup className="mb-3" controlId="query">
							<Form.Control
								type="query"
								placeholder="Búsqueda por ciudad"
								id="queri"
							/>
							<InputGroup.Text id="basic-addon2">
								<Button variant="link" type="submit">
									Buscar
								</Button>
							</InputGroup.Text>
						</InputGroup>
					</Form>
				</Row>
				<Row style={{ gap: 10, justifyContent: 'center' }}>
					{data?.map((notice) => (
						<NoticeCard key={notice.id} notice={notice} />
					))}
				</Row>
				<Row style={{ marginTop: 20, marginBottom: 20 }}>
					<Pagination style={{ justifyContent: 'end' }}>
						{data?.nextPage && (
							<Pagination.Item onClick={handleNext}>Siguiente</Pagination.Item>
						)}
					</Pagination>
				</Row>
			</Container>
		</div>
	);
}

export default App;