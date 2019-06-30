import React from 'react';

import { Container, Row, Col, Icon, Button, Spacer } from '@cleartrip/bento';

import OutsideClickHandler from '../OutsideClickHandler';
import { formatCurrency } from '../../utils/priceFormater';

const Modal = props => {
	const closeModal = () => props.onClose();

	return (
		<OutsideClickHandler onOutsideClick={() => closeModal()}>
			<div className="bg-white z-90 w-100p br-4 p-relative modal">
				<header className=" px-16 pt-4 bb bc-grey-10">
					<Container>
						<Row>
							<Col className="flex flex-middle flex-between">
								<h4 className="fs-15 fw-600">Details</h4>
								<Icon
									icon="cross"
									width="24"
									height="24"
									className="c-grey-70 current-stroke c-pointer"
									onClick={() => closeModal()}
								/>
							</Col>
						</Row>
					</Container>
				</header>

				<main
					className="px-24 "
					style={{
						maxHeight: '70vh',
						overflowY: 'scroll',
					}}
				>
					<Spacer my={4} />

					<Container>
						<Row>
							<Col>
								<div className="flex flex-column flex-between">
									<header className="flex flex-between">
										<div className="flex-1">
											<h4 className="fw-600">{props.description}</h4>
										</div>
									</header>

									<p className="fs-body l-height-0">
										{' '}
										<span className="fs-14 fw-600">Brand: </span> {props.brand}
									</p>
									<p className="fs-body l-height-0">
										{' '}
										<span className="fs-14 fw-600">Age: </span> {props.age}
									</p>
									<p className="fs-body l-height-0">
										{' '}
										<span className="fs-14 fw-600">Quantity: </span>{' '}
										{props.quantity}
									</p>
									<p className="fs-body l-height-0">
										{' '}
										<span className="fs-14 fw-600">Size: </span> {props.size}
									</p>

									<Spacer my={8} />
								</div>
							</Col>
						</Row>
					</Container>
				</main>

				<div
					className="bg-white py-16 px-16 bbr-4"
					style={{
						boxShadow: '0 -2px 8px 0 rgba(0,0,0,.2)',
					}}
				>
					<Container>
						<Row>
							<Col span={24}>
								<div className="flex flex-around ">
									<div>
										<p className="mb-4 mt-4 fw-600 ">
											₹ {formatCurrency(props.sp)}
										</p>
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		</OutsideClickHandler>
	);
};

export default Modal;
