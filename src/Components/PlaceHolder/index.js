import React from 'react';
import Stencil from '../Stencil';

import { ReactComponent as Photo } from './icons/photo.svg';

const Placeholder = props => {
	return (
		<div className="flex flex-column pt-8 pb-8 col-6 col-12--sm col-24--xs middleStencil">
			<Stencil
				width="272"
				height="272"
				shimmer={true}
				className="flex flex-center flex-middle br2"
			>
				<Photo width="45" height="37" fill="#cccccc" />
			</Stencil>

			<div className="ml-10 flex-1">
				<Stencil width="167" height="13" shimmer={true} className="d-b" />

				<div className="flex flex-between">
					<div>
						<div className="flex flex-middle mt-5">
							<Stencil width="67" height="8" shimmer={true} className="d-b" />
						</div>
					</div>

					<div className="flex flex-column flex-center ta-r">
						<Stencil width="45" height="14" shimmer={true} className="d-b" />
					</div>
				</div>
			</div>
		</div>
	);
};

Placeholder.displayName = 'Placeholder(HotelItem)';

export default Placeholder;
