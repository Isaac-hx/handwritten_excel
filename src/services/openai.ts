import OpenAI from "openai"
const client = new OpenAI({
    apiKey:"sk-mnopqrstuvwxabcdmnopqrstuvwxabcdmnopqrst"
})


export const chatWithOpenAI = async()=>{
    try{
        const response = await client.responses.create({
            model:"gpt-4o",
            input:"Jika hari ini adalah hari sabtu?, maka 3900 hari lagi adalsah hari?"
        }
        )
        console.log(response.output_text)
        return response

    }catch(e){
        
        console.log(e)
        throw e
    }
}