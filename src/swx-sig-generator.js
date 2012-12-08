(function (g) {
	'use strict';
	// create namespace
	g.siteworx = g.siteworx || {};
	g.siteworx.email = g.siteworx.email || {};
	// declarations
	var Template,
		Fields;
	
	function Signature(config) {
		var me = this;
		this.contacts = [];
		this.config = config;
		// add event
		this.config.addBtn.click(function (e) {
			e.preventDefault();
			me.addContact();
			me.onChange();
		});
		// remove event
		this.config.removeBtn.click(function (e) {
			e.preventDefault();
			me.removeContact();
			me.onChange();
		});
		// on changes
		this.config.name.keyup(function () {
			me.onChange();
		});
		this.config.title.keyup(function () {
			me.onChange();
		});
	}
	
	Signature.prototype = {
		addContact: function () {
			// get new field  context
			var contact = {
					type: Fields.textbox(),
					value: Fields.textbox(),
					container: Fields.container()
				},
				me = this;
			// el configs
			contact.type.addClass('type');
			contact.type.attr('placeholder', 'Contact Type');
			contact.value.attr('placeholder', 'Phone or Username')
			// set listener
			contact.type.keyup(function (){me.onChange();});
			contact.value.keyup(function (){me.onChange();});
			// add fields to container
			contact.container.append(contact.type);
			contact.container.append(contact.value);
			// save
			this.contacts.push(contact);
			// append
			this.config.contactsContainer.append(contact.container);
		},
		removeContact: function () {
			if (this.contacts.length > 0) {
				var last = this.contacts.pop();
				// remove element
				last.container.remove();
			}
		},
		onChange: function () {
			var i,
				contacts = '',
				output = '',
				// get name and title
				name = this.config.name.val(),
				title = this.config.title.val();
			// loop through contacts
			for (i = 0; i < this.contacts.length; ++i) {
				contacts += Template.contact(this.contacts[i].type.val(), this.contacts[i].value.val());
			}
			output = Template.structure(name, title, contacts);
			// update visual
			this.config.outputRender.html(output);
			this.config.outputText.val(output);
		}
	};
	
	Fields = {
		container: function () {
			return $('<div class="item" />');
		},
		textbox: function () {
			return $('<input type="text" />');
		}
	};
	
	Template = {
		structure: function (name, title, contacts) {
			return '<span style="font-size:12px;color:#666666;font-family:arial,helvetica,sans-serif;">' +
				this.name(name) + this.title(title) +
				'<br><br>' + (contacts != '' ? contacts + '<br>' : '') +
				this.address() +
				'</span>';
		},
		name: function (name) {
			return '<span style="font-weight:bold;color:#000000;">' + name + '</span>';
		},
		title: function (title) {
			return '<span style="padding-left:5px">' + title + '</span>';
		},
		contact: function (type, contact) {
			return '<span style="font-weight:bold;">' + type + ':</span> ' + contact + ' ';
		},
		address: function () {
			return '<span style="color:#000;font-weight:bold;">Siteworx, Inc.</span> 200 South Wacker, Suite 1675, Chicago, IL 60606' +
				'<br /><a href="http://siteworx.com" style="color:#47c7f9;text-decoration:underline;">www.siteworx.com</a>';
		}
	};
	
	// expose objects
	g.siteworx.email.Signature = Signature;
}(this));

(function (g) {
	'use strict';
	$(g.document).ready(function () {
		var s = new g.siteworx.email.Signature({
			name: $('[name="name"]'),
			title: $('[name="title"]'),
			contactsContainer: $('.contacts-placeholder'),
			addBtn: $('.add-contact'),
			removeBtn: $('.remove-contact'),
			outputRender: $('div.output'),
			outputText: $('textarea.output')
		});
	});
}(this));