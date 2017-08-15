<?php
/**
 * Adds the required helper functions used in the Genesis Starter Theme.
 *
 * @package     KnowITMedia\GenesisStarter
 * @since       1.0.0
 * @author      Dwane Dunn
 * @link        https://dwanedunn.com
 * @license     GNU General Public License 2.0+
 */

namespace KnowITMedia\GenesisStarter\Customizer;
/**
 * Get settings prefix
 *
 * @since 1.0.0
 *
 * @return string
 */
function get_settings_prefix() {
	return 'genesis-starter';
}

/**
 * Get default link color for Customizer.
 * Abstracted here since at least two functions use it.
 *
 * @since 1.0.0
 *
 * @return string Hex color code for link color.
 */
function get_default_link_color() {
	return '#c3251d';
}

/**
 * Get default accent color for Customizer.
 * Abstracted here since at least two functions use it.
 *
 * @since 1.0.0
 *
 * @return string Hex color code for accent color.
 */
function get_default_accent_color() {
	return '#c3251d';
}

/**
 * Calculate the color contrast.
 *
 * @since 1.0.0
 *
 * @return string Hex color code for contrast color
 */
function calculate_color_contrast( $color ) {

	$hexcolor = str_replace( '#', '', $color );
	$red      = hexdec( substr( $hexcolor, 0, 2 ) );
	$green    = hexdec( substr( $hexcolor, 2, 2 ) );
	$blue     = hexdec( substr( $hexcolor, 4, 2 ) );

	$luminosity = ( ( $red * 0.2126 ) + ( $green * 0.7152 ) + ( $blue * 0.0722 ) );

	return ( $luminosity > 128 ) ? '#333333' : '#ffffff';

}

/**
 * Calculate the color brightness.
 *
 * @since 1.0.0
 *
 * @return string Hex color code for the color brightness
 */
function calculate_color_brightness( $color, $change ) {

	$hexcolor = str_replace( '#', '', $color );

	$red   = hexdec( substr( $hexcolor, 0, 2 ) );
	$green = hexdec( substr( $hexcolor, 2, 2 ) );
	$blue  = hexdec( substr( $hexcolor, 4, 2 ) );

	$red   = max( 0, min( 255, $red + $change ) );
	$green = max( 0, min( 255, $green + $change ) );
	$blue  = max( 0, min( 255, $blue + $change ) );

	return '#'.dechex( $red ).dechex( $green ).dechex( $blue );

}
