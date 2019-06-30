import React, { Component } from 'react';
import Airtable from 'airtable';
import { CSSTransition } from 'react-transition-group';
import { Container, Row, Col, Spacer, Divider, Badge } from '@cleartrip/bento';
import ProductCard from '../ProductCard';
import PlaceHolder from '../PlaceHolder';
import Overlay from '../Overlay';
import EnquireModal from '../Modal';

import { ReactComponent as Whatsapp } from './icons/whatsapp.svg';

const PORT = process.env.PORT || 3000;

const base = new Airtable({ apiKey: 'keyjBhSLDQCg7eLpG' }).base(
	'appB79FVjMZAsNrZ9',
);

const category = {
	electronics: 'primary',
	furniture: 'secondary',
	'kitchen appliance': 'success',
	'riding accessories': 'warning',
};

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			records: [],
			allrecords: [],
			EnquireModalVisibilty: false,
			description: '',
			quantity: 0,
			sp: 0,
		};
	}

	componentDidMount() {
		console.log(this.state.records);
		var self = this;
		base('Furniture')
			.select({
				// Selecting the first 3 records in Main View:
				maxRecords: 42,
				view: 'Main View',
			})
			.eachPage(
				function page(records, fetchNextPage) {
					// This function (`page`) will get called for each page of records.
					console.log(records);
					self.setState({
						records,
						allrecords: records,
					});
					records.forEach(function(record) {
						console.log('Retrieved', record.get('Name'));
					});

					// To fetch the next page of records, call `fetchNextPage`.
					// If there are more records, `page` will get called again.
					// If there are no more records, `done` will get called.
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				},
			);
	}

	SetEnquireModalVisibilty = (toggle, record) => {
		this.setState({ EnquireModalVisibilty: toggle });
		this.setState({
			description: record.fields['Description'],
			imageurl: record.fields['Picture']
				? record.fields['Picture'][0].thumbnails.large.url
				: null,
			brand: record.fields['Vendor'],
			age: record.fields['Age'],
			quantity: record.fields['Quantity'],
			sp: record.fields['Selling Price'],
			size: record.fields['Size'],
		});
	};

	closeSelector = () => {
		this.setState({ EnquireModalVisibilty: false });
	};

	filterByCategory = cat => {
		if (cat === 'all') {
			this.setState({ allrecords: this.state.records });
			return;
		}
		if (this.state.records.length > 0) {
			const filteredData = this.state.records.filter(record => {
				console.log("record['Type']", record.fields['Type']);
				const type = record.fields['Type']
					? record.fields['Type'].toLowerCase()
					: '';
				return type === cat;
			});

			this.setState({ allrecords: filteredData });
		}
	};

	render() {
		return (
			<div>
				<Container>
					<Spacer my={10} />

					<Row middle>
						<Col span={24}>
							<p className="fs-heading-3 fw-700">Moving out sale</p>
							<p class="fs-body-3 c-grey-50">
								Here’s a pool of all the available products that you can find in
								our house.
							</p>
							<p class=" fs-15 c-grey-70 fw-600 ">
								For enquiry
								<span className="p-8">
									<Whatsapp height={14} width={14} />
								</span>
								at 7829573376
							</p>
							<p class="fs-caption-3 c-grey-40 mb-20 lh-body">
								Note: - Pickup at house (HSR sector-2).
							</p>
						</Col>
					</Row>
					<Divider className="my-12" />
					<Spacer my={20} />

					<Row>
						<Col span={24}>
							<Badge
								type="dark"
								className="mr-4 ml-4 p-8 c-pointer"
								onClick={this.filterByCategory.bind(null, 'all')}
							>
								All
							</Badge>
							{Object.keys(category).map(cat => {
								return (
									<Badge
										type={category[cat]}
										className="mr-4 ml-4 p-8 c-pointer"
										onClick={this.filterByCategory.bind(null, cat)}
									>
										{cat}
									</Badge>
								);
							})}
						</Col>
					</Row>
					<Spacer my={20} />
					<Row>
						{this.state.allrecords.length > 0
							? this.state.allrecords.map((record, index) => (
									<Col
										span={6}
										index={index}
										key={index}
										className="col-6 col-12--sm col-24--xs"
									>
										<div
											key={index}
											onClick={() =>
												this.SetEnquireModalVisibilty(true, record)
											}
										>
											<ProductCard
												className="mb-16"
												location={record.fields['Name']}
												img={
													record.fields['Picture']
														? record.fields['Picture'][0].thumbnails.large.url
														: 'https://source.unsplash.com/collection/158643/273x312'
												}
												categoryColor={category[record.fields['Type']]}
												category={
													record.fields['Type']
														? record.fields['Type']
														: 'Others'
												}
												themes={record.fields['Description']}
												price={Math.ceil(record.fields['Selling Price'])}
												actualprice={record.fields['Unit Cost']}
											/>
										</div>
									</Col>
							  ))
							: Array.apply(null, Array(12)).map(a => {
									return (
										<Col span={6} className="col-6 col-12--sm col-24--xs">
											<PlaceHolder />
										</Col>
									);
							  })}
					</Row>

					<Spacer my={20} />
				</Container>
				<CSSTransition
					in={this.state.EnquireModalVisibilty}
					timeout={100}
					classNames="fade"
					unmountOnExit
				>
					{state => (
						<Overlay>
							<CSSTransition
								in={state === 'entered'}
								timeout={300}
								classNames="fadeUp"
								unmountOnExit
							>
								<EnquireModal
									onClose={this.closeSelector}
									description={this.state.description}
									imageurl={this.state.imageurl}
									brand={this.state.brand}
									age={this.state.age}
									quantity={this.state.quantity}
									sp={this.state.sp}
									size={this.state.size}
								/>
							</CSSTransition>
						</Overlay>
					)}
				</CSSTransition>
			</div>
		);
	}
}
