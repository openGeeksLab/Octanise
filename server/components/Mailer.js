var nodemailer = require('nodemailer'),
  config = require('./../config'),
  okay = require('okay'),
  path = require('path'),
  _ = require('lodash'),
  viewsPath = '../../client/emails/',
  SwigEngine = require('swig').Swig,
  swig = new SwigEngine({
    varControls: ['<%=', '%>'],
    cache : false
  });

function Mailer(options) {
  this.transport = nodemailer.createTransport(options);
};

Mailer.prototype.render = function(template, options, callback) {
  swig.renderFile(path.join(__dirname, viewsPath, template), options || {}, callback);
};

Mailer.prototype.send = function(options, callback) {
  var options = options || {};

  _.defaults(options, {
    from : config.emailFrom,
    bcc : config.bccEmails || []
  });

  this.transport.sendMail(options, okay(callback, function(data){
    console.log('Message sent: ' + data.response);
    callback && callback(null, data);
  }));
};

Mailer.prototype.sendMail = function(template, emails, options, callback) {
  var self = this;
  self.render(template, options, okay(callback, function(output) {
    self.send({
      to : emails,
      subject : options.subject,
      html : output
    }, callback);
  }));
};

Mailer.prototype.close = function() {
  this.transport.close();
};

module.exports = new Mailer(config.mailer);