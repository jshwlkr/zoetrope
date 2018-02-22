/**
 * BLOCK: zoetrope
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, MediaUpload } = wp.blocks; // Import registerBlockType() from wp.blocks
const { Button } = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-zoetrope', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'ÇoEtrope' ), // Block title.
	icon: 'format-video', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: {
		mp4: {
			source: 'attribute',
			type: 'string',
			selector: 'source[type="video/mp4"]',
			attribute: 'srcset',
		},
		mp4ID: {
			type: 'number',
		},
		webp: {
			source: 'attribute',
			type: 'string',
			selector: 'source[type="image/webp"]',
			attribute: 'srcset',
		},
		webpID: {
			type: 'number',
		},
		gif: {
			source: 'attribute',
			type: 'string',
			selector: 'img',
			attribute: 'src',
		},
		gifID: {
			type: 'number',
		},
	},
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		// Creates a <p class='wp-block-cgb-block-zoetrope'></p>.

		const onSelectMP4 = media => {
			props.setAttributes( {
				mp4: media.url,
				mp4ID: media.id,
			} );
		};

		const onSelectWEBP = media => {
			props.setAttributes( {
				webp: media.url,
				webpID: media.id,
			} );
		};

		const onSelectGIF = media => {
			props.setAttributes( {
				gif: media.url,
				gifID: media.id,
			} );
		};

		return (
			<div className="mp4">
				<MediaUpload
					onSelect={ onSelectMP4 }
					type="video"
					value={ props.attributes.mediaID }
					render={ ( { open } ) => (
						<Button className={ props.attributes.mp4ID ? 'image-button' : 'button button-large' } onClick={ open }>
							{ ! props.attributes.mp4ID ? __( 'Upload MP4' ) : <video src={ props.attributes.mp4 } /> }
						</Button>
					) }
				/>
				<MediaUpload
					onSelect={ onSelectWEBP }
					type="image"
					value={ props.attributes.mediaID }
					render={ ( { open } ) => (
						<Button className={ props.attributes.webpID ? 'image-button' : 'button button-large' } onClick={ open }>
							{ ! props.attributes.webpID ? __( 'Upload WebP' ) : <img alt src={ props.attributes.webp } /> }
						</Button>
					) }
				/>
				<MediaUpload
					onSelect={ onSelectGIF }
					type="image"
					value={ props.attributes.mediaID }
					render={ ( { open } ) => (
						<Button className={ props.attributes.gifID ? 'image-button' : 'button button-large' } onClick={ open }>
							{ ! props.attributes.gifID ? __( 'Upload Gif' ) : <img alt src={ props.attributes.gif } /> }
						</Button>
					) }
				/>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		return (
			<div className={ props.className }>
				<picture>
					<source type="video/mp4" srcSet={ props.attributes.mp4 } />
					<source type="image/webp" srcSet={ props.attributes.webp } />
                    <img alt src={ props.attributes.gif } />
				</picture>
			</div>
		);
	},
} );
