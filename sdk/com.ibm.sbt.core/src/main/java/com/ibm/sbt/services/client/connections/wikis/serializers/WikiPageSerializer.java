/*
 * © Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

package com.ibm.sbt.services.client.connections.wikis.serializers;

import static com.ibm.sbt.services.client.base.ConnectionsConstants.CONTENT;
import static com.ibm.sbt.services.client.base.ConnectionsConstants.HTML;
import static com.ibm.sbt.services.client.base.ConnectionsConstants.LABEL;
import static com.ibm.sbt.services.client.base.ConnectionsConstants.PAGE;
import static com.ibm.sbt.services.client.base.ConnectionsConstants.TYPE;

import org.w3c.dom.Element;
import org.w3c.dom.Node;

import com.ibm.sbt.services.client.base.ConnectionsConstants.Namespace;
import com.ibm.sbt.services.client.base.serializers.AtomEntitySerializer;
import com.ibm.sbt.services.client.connections.wikis.WikiPage;

/**
 * @author Mario Duarte
 *
 */
public class WikiPageSerializer extends AtomEntitySerializer<WikiPage> {

	public WikiPageSerializer(WikiPage entity) {
		super(entity);
	}

	protected void generateCreatePayload() {
		Node entry = entry();
		
		appendChildren(entry,
				title(),
				label(),
				wikiPageCategory(),
				summary(),
				content()
		);
	}

	protected void generateUpdatePayload() {
		Node entry = genericAtomEntry();
		
		appendChildren(entry,
				label(),
				wikiPageCategory()
		);
	}

	public String createPayload(){
		generateCreatePayload();
		return serializeToString();
	}

	public String updatePayload(){
		generateUpdatePayload();
		return serializeToString();
	}

	private Element label() {
		return textElement(Namespace.TD.getUrl(), LABEL, entity.getLabel());
	}
	
	private Element wikiPageCategory() {
		return categoryType(PAGE);
	}
	
	@Override
	protected Element content() {
		return textElement(CONTENT, entity.getContent(), attribute(TYPE, HTML));
	}
}
