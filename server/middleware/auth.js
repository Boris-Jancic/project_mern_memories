import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {    // next: do something and move to the next thing
    try {
        const token = req.headers.authorization.split(""[1])
        const isCustomAuth = token.length < 500
        let decodedData
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test')

            req.userId = decodedData?.id // gets users id from jwt
        } else {
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub // gets users id from google OAuth
        }

        next()
    } catch (e) {
        
    }
}

export default auth