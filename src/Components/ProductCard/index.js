import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { formatCurrency } from '../../utils/priceFormater';
import { Divider } from '@cleartrip/bento';

const ProductCard = props => {
	const thumbClass = classNames(
		'c-pointer',
		'hover:elevation-md',
		props.className,
	);
	return (
		<div className={thumbClass}>
			<div
				height="273"
				width="100%"
				className="bg-grey-10 btr-4"
				style={{
					backgroundImage: `url(${encodeURI(props.img)})`,
					backgroundSize: 'contain',
					backgroundPosition: 'center',
					height: '273px',
					backgroundRepeat: 'no-repeat',
				}}
			/>
			<div className="bg-white bbr-4 p-16 ba bc-grey-10">
				<header className="flex flex-between">
					<p className="fs-14 ta-left fw-600 w-100p">{props.location}</p>
					{props.price && (
						<>
							<div className="flex flex-column flex-center ta-r w-50p">
								{props.actualprice && (
									<p className="fs-15 c-grey-50 ta-right m-0 l-height-0 mt-15">
										<strike>₹&nbsp;{props.actualprice}</strike>
									</p>
								)}
								<p className=" ta-right">₹&nbsp;{props.price}</p>
							</div>
						</>
					)}
				</header>

				{/* <div>
					<Divider className="my-12" />
					<footer className="flex">
						<p className="fs-body c-grey-70 truncateText">{props.themes}</p>
					</footer>
				</div> */}
			</div>
		</div>
	);
};

ProductCard.propTypes = {
	className: PropTypes.string,
	location: PropTypes.string.isRequired,
	themes: PropTypes.string.isRequired,
	price: PropTypes.number,
	img: PropTypes.string,
};

ProductCard.defaultProps = {
	className: '',
	img: 'https://source.unsplash.com/collection/158643/273x312',
};

export default React.memo(ProductCard);
