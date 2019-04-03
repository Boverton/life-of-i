const express = require('express');
const router = express.Router();
const dal = require('../lib/dal');
const bcrypt = require('bcrypt');

/**
 * auth/register route
 */
router.post('/register', (req, res) => {
   (async () => {
      let body = req.body, errors;

      try {
          //trim the whitespace from fields
          trimBodyValues(body);

          errors = await validate(body);

          // Any errors returned from validation = 400 else 200
          if (errors.length > 0) {
              res.status(400).send({errors: errors});
          } else {
              body.password = await hashPassword(body.password);

              dal.insert("users", body);
              return res.status(200).send({good: true})
          }
      } catch (e) {
          // general errors inserting or validating
          return res.status(500).send(e.message);
      }
   })();

   /**
    * Run through validation
    *   All fields have values
    *   username unique
    *   email is valid format
    *   email is unique
    *   password is long enough
    * @param body payload of request
    * @returns {Promise<Array>}
    */
   function validate(body) {
      return new Promise(resolve => {
         let errors = [];
         (async () => {
            await requireAll(body, errors);

            // if body fields aren't empty do validation on the values
            if (errors.length === 0 ) {
               await validateUsernameUnique(body.username, errors);
               await validateEmailIsValid(body.email, errors);
               await validateEmailUnique(body.email, errors);
               await validatePasswordLongEnough(body.password, errors);
            }

            return resolve(errors);
         })();
      });
   }


   /**
    * Validates the username is unique and doesn't exist in users.username
    *
    * @param username
    * @param errors
    * @returns {Promise<Array>}
    */
   function validateUsernameUnique(username, errors) {
      return new Promise( resolve => {
         (async () => {
            let isUnique = await dal.isUnique("users", {username: username});
            if (!isUnique) {
               errors.push({
                  field: "username",
                  message: "Username already taken, please choose another."
               });
            }
            return resolve(errors);
         })();
      });
   }

   /**
    * Validates email is proper format
    *
    * @param email
    * @param errors
    * @returns {Promise<Array>}
    */
   function validateEmailIsValid(email, errors) {
      return new Promise(resolve => {
         if (!validateEmailAddress(email)) {
            errors.push({
               field: "email",
               message: email + " is not a valid email address."
            });
         }

         return resolve(errors);
      });
   }

   /**
    * Validates email is unique  and doesn't exist in users.emai
    *
    * @param email
    * @param errors
    * @returns {Promise<Array>}
    */
   function validateEmailUnique(email, errors) {
      return new Promise(resolve => {
         (async () => {
            let isUnique = await dal.isUnique("users", {email: email});
            if (!isUnique) {
               errors.push({
                  field: "email",
                  message: "Email is already registered, please log in."
               });
            }
            return resolve(errors);
         })();
      });
   }

   /**
    * Validates password is long enough (> 5 char)
    *
    * @param password
    * @param errors
    * @returns {Promise<Array>}
    */
   function validatePasswordLongEnough(password, errors) {
      return new Promise( resolve => {
         if (password.length < 5) {
            errors.push({
               field: "password",
               message: "Password must be more than 5 characters."
            });
         }
         return resolve(errors)
      });
   }

   /**
    * Using bcrypt generate and return hashed password
    *
    * @param password
    * @returns {Promise<String>}
    */
   function hashPassword(password) {
      return new Promise( resolve => {
         bcrypt.hash(password, Number(process.env.B_SALT_ROUND), function (err, hash) {
            return resolve(hash);
         });
      });
   }

   /**
    * covers 95% email validation
    * https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    * @param email
    * @returns {boolean}
    */
   function validateEmailAddress(email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
   }
});

/**
 * auth/register route
 */
router.post('/register', (req, res) => {
   (async () => {
      let body = req.body, errors;

      try {
         //trim the whitespace from username and password
         body.email = body.email.trim();
         body.password = body.password.trim();

         errors = await validate(body, res);

         // Any errors returned from validation = 400 else 200
         if (errors.length > 0) {
            res.status(400).send({errors: errors});
         } else {
            body.password = await hashPassword(body.password);

            dal.insert("users", body);
            return res.status(200).send({good: true})
         }
      } catch (e) {
         // general errors inserting or validating
         return res.status(500).send(e.message);
      }
   })()
});


/*****
 * General funcs
 *****/

   /**
    * Validates all fields in request have a value
    * @param body
    * @param errors
    * @returns {Promise<Array>}
    */
   function requireAll(body, errors) {
      return new Promise(resolve => {
         for(let field in body) {
            if (body.hasOwnProperty(field)) {
               if (!body[field]) {
                  errors.push({
                     field: field,
                     message: capitalizeFirstLetter(field).replace(/_/," ") + " is required",
                  })
               }
            }
         }
         return resolve(errors);
      })
   }


/**
 * Capitalizes first letter of a string
 *
 * @param string
 * @returns {string}
 */
function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * trim white space off any values sent back
 * @param body
 */
function trimBodyValues(body) {
   for(let index in body) {
      let value = body[index];
      // trim white space and set it to new value
      body[index] = value.trim();
   }
}


module.exports = router;