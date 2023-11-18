/* eslint-disable react/prop-types */
import React from 'react';
import { Card, Col } from 'react-bootstrap';

function NoticeCard({ notice }) {
	return (
		<Col xs={24} sm={4} md={3} lg={3}>
			<a href={notice.link} style={{ textDecoration: 'none' }} target="_blank">
				<Card
					className="notice-card"
					style={{
						width: '-webkit-fill-available',
						maxHeight: 400,
						height: '100%',
					}}
				>
					<Card.Img
						variant="top"
						src={notice.urlToImage}
						style={{
							maxHeight: 200,
							objectFit: 'cover',
							objectPosition: 'center',
						}}
					/>
					<Card.Body>
						<Card.Title
							style={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitLineClamp: 3,
								WebkitBoxOrient: 'vertical',
							}}
						>
							{notice.title}
						</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">
							Publicado el{' '}
							{new Date(notice.publishedAt).toLocaleDateString('es-ES', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</Card.Subtitle>
						<Card.Text
							style={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitLineClamp: 3,
								WebkitBoxOrient: 'vertical',
							}}
						>
							{notice.description}
						</Card.Text>
					</Card.Body>
				</Card>
			</a>
		</Col>
	);
}

export default NoticeCard;