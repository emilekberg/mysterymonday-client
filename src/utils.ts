export function tryParseJson<T extends {}>(data: string|null): undefined|T {
	if(!data) {
		return undefined;
	}
	try {
		return JSON.parse(data);
	}
	catch (e) {
		return undefined;
	}
}

export function getQuery<T>(): T {
	const decodedString = decodeURIComponent(window.location.href);
	return queryStringToJson<T>(urlToQueryString(decodedString));
}

export function urlToQueryString(url: string): string {
	const index = url.indexOf("?");
	if(index > -1) {
		return url.substr(index+1);
	}
	return "";
}

export function queryStringToJson<T>(query: string): T {
	return query.split("&")
		.map(x => x.split("="))
		.reduce((accumulator: {[key: string]: string}, x: string[]) => {
			const key = x[0];
			const value = x[1];
			accumulator[key] = value;
			return accumulator;
		}, {}
	) as T;
}
