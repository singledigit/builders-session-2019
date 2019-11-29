const isLocal = process.env.AWS_SAM_LOCAL;

const handlerModel = (code, body) => {
    let response = {
        'statusCode': code,
        'body': JSON.stringify(body),
    }
    if (isLocal) {
        response.headers = {};
        response.headers['Access-Control-Allow-Origin'] = "*"
    }
    return response;
}

exports.success = (body) => {
    console.log('success hit');
    return handlerModel(200, body)
}

exports.fail = (body, code = 500) => {
    console.log('fail hit');
    return handlerModel(code, body)
}