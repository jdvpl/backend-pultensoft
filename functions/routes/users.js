
const { Router }=require('express');
const admin=require("firebase-admin");
const router = new Router();


admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://pultemsoft.firebaseio.com",
  });
  
  const db=admin.firestore().collection("users");
// crear usuario
router.post("/api/users", async(req, res) => {
    try {
       const ref=await db.doc()
       const id=ref.id;
       req.body.id=id;
       req.body.created_At=Date.now();
       await ref.set(req.body);

       res.status(200).json({msg: `se agrego correctamente el usuario con id: ${id}`})
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
   });
// crear usuario por id 
router.post("/api/adduser", async(req, res) => {
    try {
       const ref=await db.doc(req.body.id)
       req.body.created_At=Date.now();
       await ref.set(req.body);

       res.status(200).json({msg: `se agrego correctamente el usuario`})
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
   });
   
// obtener usuario por id works
router.get("/api/user/:id",(req,res)=>{
    (async ()=>{
        try {
            const doc= db.doc(req.params.id)
            const item=await doc.get();
            const response=item.data();
            return res.status(200).json(response)
            } catch (error) {
            console.log(error)
            return res.status(500).send(error)
            }
    })();
})
// obtener usuario por documento
router.get("/api/document/:doc",async(req,res)=>{

    try {
        const document=req.params.doc;
        console.log(document)
        const querySnapshot=await db.where("document", "==", document).get();
        const response=querySnapshot.docs.map(doc =>doc.data());
        return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }

})

// obtener todos los usuarios
router.get("/api/users",async(req, res)=>{
    try {

    const querySnapshot=await db.get();
    const respose=querySnapshot.docs.map(doc =>doc.data());
    return res.status(200).json(respose)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});
// delete
router.delete("/api/user/:id", async(req, res)=>{
    try {
        const id=req.params.id;
        const doc= db.doc(req.params.id)
        await doc.delete();
        res.status(200).json({msg: `se elminino correctamente el usuario con id: ${id}`})
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})

router.put("/api/user/:id", async(req, res)=>{
    try {
        const id=req.params.id;
        const document= db.doc(req.params.id);
        req.body.id=id;
        req.body.updated_At=Date.now()
        await document.update(req.body)
        return res.status(200).json({msg: "Se actualizo correctamente el usuario con id: "+id})
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})
module.exports = router;




