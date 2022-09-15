module.exports = ({ array, count, limit, page }) => {

	if(array && isNaN(count))
		count = array.length;

	const pages = Math.ceil(count/limit); /* All available pages */

	/* Validate page */
	if(isNaN(page) || page < 0 || page > pages)
	{
		page = 1;
	}

	const result = {
		count, limit,
		page, pages
	};

	if(array)
		result.array = array.slice((page - 1) * limit, page * limit);

	return result;
}