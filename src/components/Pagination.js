import React from 'react';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default function ({ currentPage, setPage, lastPage }) {
	const slots = Math.min(5, lastPage);

	let start = currentPage - Math.floor(slots / 2);
	let end = currentPage + Math.floor(slots / 2);

	if (start < 1) {
		start = 1;
		end = Math.min(slots, lastPage);
	}

	else if (end > lastPage) {
		start = Math.max(lastPage - slots + 1, 1);
		end = lastPage;
	}

	let pages = [];
	for (let i = start; i <= end; i++) {
		pages.push(i);
	}

	return (
		<Pagination>
			<PaginationItem disabled={currentPage == 1}>
				<PaginationLink
					onClick={() => setPage(1)}
					>
					<i className="cil-media-step-backward" />
				</PaginationLink>
			</PaginationItem>

			<PaginationItem disabled={currentPage <= 1}>
				<PaginationLink
					previous
					onClick={() => setPage(Math.max(1, currentPage - 1))}
					>
					<i className="cil-media-skip-backward" />
				</PaginationLink>
			</PaginationItem>

			{pages.map((page, idx) =>
				<PaginationItem key={idx} active={(page) == currentPage}>
					<PaginationLink
						onClick={() => setPage(page)}
					>
						{page}
					</PaginationLink>
				</PaginationItem>
			)}

			<PaginationItem disabled={currentPage >= lastPage}>
				<PaginationLink
					next
					onClick={() => setPage(currentPage + 1)}
					>
					<i className="cil-media-skip-forward" />
				</PaginationLink>
			</PaginationItem>

			<PaginationItem disabled={currentPage >= lastPage}>
				<PaginationLink
					onClick={() => setPage(lastPage)}
				>
					<i className="cil-media-step-forward" />
				</PaginationLink>
			</PaginationItem>
		</Pagination>
	);
}
