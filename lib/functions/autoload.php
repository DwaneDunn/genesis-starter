<?php
/**
 * Autoload files
 *
 * @package     KnowITMedia\GenesisStarter
 * @since       1.0.0
 * @author      Dwane Dunn
 * @link        https://dwanedunn.com
 * @license     GNU General Public License 2.0+
 */

namespace KnowITMedia\GenesisStarter;

/**
 * Loads non admin files.
 *
 * @since 1.0.1
 *
 * @return void
 */
function load_nonadmin_files() {
	$filenames = array(
		'setup.php',
		'components/customizer/css-handler.php',
		'components/customizer/customizer.php',
		'components/customizer/helper-functions.php',
		'functions/load-assets.php',
		'functions/markup.php',
		'structure/comments.php',
		'structure/footer.php',
		'structure/header.php',
		'structure/menu.php',
		'structure/post.php',
		'structure/sidebar.php',
	);
	load_specified_files( $filenames );
}
//add_action( 'admin_init', __NAMESPACE__ . '\load_admin_files' );
/**
 * Load admin files.
 *
 * @since 1.0.1
 *
 * @return void
 */
function load_admin_files() {
	$filenames = array(
	);
	load_specified_files( $filenames );
}
/**
 * Load each of the specified files.
 *
 * @since 1.0.0
 *
 * @param array $filenames
 * @param string $folder_root
 *
 * @return void
 */
function load_specified_files( array $filenames, $folder_root = '' ) {
	$folder_root = $folder_root ?: CHILD_THEME_DIR . '/lib/';
	foreach( $filenames as $filename ) {
		include( $folder_root . $filename );
	}
}
load_nonadmin_files();

// Add WooCommerce support.
//include_once( get_stylesheet_directory() . '/lib/woocommerce/woocommerce-setup.php' );

// Add the required WooCommerce styles and Customizer CSS.
//include_once( get_stylesheet_directory() . '/lib/woocommerce/woocommerce-output.php' );

// Add the Genesis Connect WooCommerce notice.
//include_once( get_stylesheet_directory() . '/lib/woocommerce/woocommerce-notice.php' );
