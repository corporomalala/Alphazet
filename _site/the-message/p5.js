/*! p5.js v0.4.17 October 13, 2015 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.p5 = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

},{}],2:[function(_dereq_,module,exports){
// Run-time checking of preconditions.

'use strict';

// Precondition function that checks if the given predicate is true.
// If not, it will throw an error.
exports.argument = function(predicate, message) {
    if (!predicate) {
        throw new Error(message);
    }
};

// Precondition function that checks if the given assertion is true.
// If not, it will throw an error.
exports.assert = exports.argument;

},{}],3:[function(_dereq_,module,exports){
// Drawing utility functions.

'use strict';

// Draw a line on the given context from point `x1,y1` to point `x2,y2`.
function line(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

exports.line = line;

},{}],4:[function(_dereq_,module,exports){
// Glyph encoding

'use strict';

var cffStandardStrings = [
    '.notdef', 'space', 'exclam', 'quotedbl', 'numbersign', 'dollar', 'percent', 'ampersand', 'quoteright',
    'parenleft', 'parenright', 'asterisk', 'plus', 'comma', 'hyphen', 'period', 'slash', 'zero', 'one', 'two',
    'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'colon', 'semicolon', 'less', 'equal', 'greater',
    'question', 'at', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'bracketleft', 'backslash', 'bracketright', 'asciicircum', 'underscore',
    'quoteleft', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z', 'braceleft', 'bar', 'braceright', 'asciitilde', 'exclamdown', 'cent', 'sterling',
    'fraction', 'yen', 'florin', 'section', 'currency', 'quotesingle', 'quotedblleft', 'guillemotleft',
    'guilsinglleft', 'guilsinglright', 'fi', 'fl', 'endash', 'dagger', 'daggerdbl', 'periodcentered', 'paragraph',
    'bullet', 'quotesinglbase', 'quotedblbase', 'quotedblright', 'guillemotright', 'ellipsis', 'perthousand',
    'questiondown', 'grave', 'acute', 'circumflex', 'tilde', 'macron', 'breve', 'dotaccent', 'dieresis', 'ring',
    'cedilla', 'hungarumlaut', 'ogonek', 'caron', 'emdash', 'AE', 'ordfeminine', 'Lslash', 'Oslash', 'OE',
    'ordmasculine', 'ae', 'dotlessi', 'lslash', 'oslash', 'oe', 'germandbls', 'onesuperior', 'logicalnot', 'mu',
    'trademark', 'Eth', 'onehalf', 'plusminus', 'Thorn', 'onequarter', 'divide', 'brokenbar', 'degree', 'thorn',
    'threequarters', 'twosuperior', 'registered', 'minus', 'eth', 'multiply', 'threesuperior', 'copyright',
    'Aacute', 'Acircumflex', 'Adieresis', 'Agrave', 'Aring', 'Atilde', 'Ccedilla', 'Eacute', 'Ecircumflex',
    'Edieresis', 'Egrave', 'Iacute', 'Icircumflex', 'Idieresis', 'Igrave', 'Ntilde', 'Oacute', 'Ocircumflex',
    'Odieresis', 'Ograve', 'Otilde', 'Scaron', 'Uacute', 'Ucircumflex', 'Udieresis', 'Ugrave', 'Yacute',
    'Ydieresis', 'Zcaron', 'aacute', 'acircumflex', 'adieresis', 'agrave', 'aring', 'atilde', 'ccedilla', 'eacute',
    'ecircumflex', 'edieresis', 'egrave', 'iacute', 'icircumflex', 'idieresis', 'igrave', 'ntilde', 'oacute',
    'ocircumflex', 'odieresis', 'ograve', 'otilde', 'scaron', 'uacute', 'ucircumflex', 'udieresis', 'ugrave',
    'yacute', 'ydieresis', 'zcaron', 'exclamsmall', 'Hungarumlautsmall', 'dollaroldstyle', 'dollarsuperior',
    'ampersandsmall', 'Acutesmall', 'parenleftsuperior', 'parenrightsuperior', '266 ff', 'onedotenleader',
    'zerooldstyle', 'oneoldstyle', 'twooldstyle', 'threeoldstyle', 'fouroldstyle', 'fiveoldstyle', 'sixoldstyle',
    'sevenoldstyle', 'eightoldstyle', 'nineoldstyle', 'commasuperior', 'threequartersemdash', 'periodsuperior',
    'questionsmall', 'asuperior', 'bsuperior', 'centsuperior', 'dsuperior', 'esuperior', 'isuperior', 'lsuperior',
    'msuperior', 'nsuperior', 'osuperior', 'rsuperior', 'ssuperior', 'tsuperior', 'ff', 'ffi', 'ffl',
    'parenleftinferior', 'parenrightinferior', 'Circumflexsmall', 'hyphensuperior', 'Gravesmall', 'Asmall',
    'Bsmall', 'Csmall', 'Dsmall', 'Esmall', 'Fsmall', 'Gsmall', 'Hsmall', 'Ismall', 'Jsmall', 'Ksmall', 'Lsmall',
    'Msmall', 'Nsmall', 'Osmall', 'Psmall', 'Qsmall', 'Rsmall', 'Ssmall', 'Tsmall', 'Usmall', 'Vsmall', 'Wsmall',
    'Xsmall', 'Ysmall', 'Zsmall', 'colonmonetary', 'onefitted', 'rupiah', 'Tildesmall', 'exclamdownsmall',
    'centoldstyle', 'Lslashsmall', 'Scaronsmall', 'Zcaronsmall', 'Dieresissmall', 'Brevesmall', 'Caronsmall',
    'Dotaccentsmall', 'Macronsmall', 'figuredash', 'hypheninferior', 'Ogoneksmall', 'Ringsmall', 'Cedillasmall',
    'questiondownsmall', 'oneeighth', 'threeeighths', 'fiveeighths', 'seveneighths', 'onethird', 'twothirds',
    'zerosuperior', 'foursuperior', 'fivesuperior', 'sixsuperior', 'sevensuperior', 'eightsuperior', 'ninesuperior',
    'zeroinferior', 'oneinferior', 'twoinferior', 'threeinferior', 'fourinferior', 'fiveinferior', 'sixinferior',
    'seveninferior', 'eightinferior', 'nineinferior', 'centinferior', 'dollarinferior', 'periodinferior',
    'commainferior', 'Agravesmall', 'Aacutesmall', 'Acircumflexsmall', 'Atildesmall', 'Adieresissmall',
    'Aringsmall', 'AEsmall', 'Ccedillasmall', 'Egravesmall', 'Eacutesmall', 'Ecircumflexsmall', 'Edieresissmall',
    'Igravesmall', 'Iacutesmall', 'Icircumflexsmall', 'Idieresissmall', 'Ethsmall', 'Ntildesmall', 'Ogravesmall',
    'Oacutesmall', 'Ocircumflexsmall', 'Otildesmall', 'Odieresissmall', 'OEsmall', 'Oslashsmall', 'Ugravesmall',
    'Uacutesmall', 'Ucircumflexsmall', 'Udieresissmall', 'Yacutesmall', 'Thornsmall', 'Ydieresissmall', '001.000',
    '001.001', '001.002', '001.003', 'Black', 'Bold', 'Book', 'Light', 'Medium', 'Regular', 'Roman', 'Semibold'];

var cffStandardEncoding = [
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', 'space', 'exclam', 'quotedbl', 'numbersign', 'dollar', 'percent', 'ampersand', 'quoteright',
    'parenleft', 'parenright', 'asterisk', 'plus', 'comma', 'hyphen', 'period', 'slash', 'zero', 'one', 'two',
    'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'colon', 'semicolon', 'less', 'equal', 'greater',
    'question', 'at', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'bracketleft', 'backslash', 'bracketright', 'asciicircum', 'underscore',
    'quoteleft', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z', 'braceleft', 'bar', 'braceright', 'asciitilde', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    'exclamdown', 'cent', 'sterling', 'fraction', 'yen', 'florin', 'section', 'currency', 'quotesingle',
    'quotedblleft', 'guillemotleft', 'guilsinglleft', 'guilsinglright', 'fi', 'fl', '', 'endash', 'dagger',
    'daggerdbl', 'periodcentered', '', 'paragraph', 'bullet', 'quotesinglbase', 'quotedblbase', 'quotedblright',
    'guillemotright', 'ellipsis', 'perthousand', '', 'questiondown', '', 'grave', 'acute', 'circumflex', 'tilde',
    'macron', 'breve', 'dotaccent', 'dieresis', '', 'ring', 'cedilla', '', 'hungarumlaut', 'ogonek', 'caron',
    'emdash', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'AE', '', 'ordfeminine', '', '', '',
    '', 'Lslash', 'Oslash', 'OE', 'ordmasculine', '', '', '', '', '', 'ae', '', '', '', 'dotlessi', '', '',
    'lslash', 'oslash', 'oe', 'germandbls'];

var cffExpertEncoding = [
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', 'space', 'exclamsmall', 'Hungarumlautsmall', '', 'dollaroldstyle', 'dollarsuperior',
    'ampersandsmall', 'Acutesmall', 'parenleftsuperior', 'parenrightsuperior', 'twodotenleader', 'onedotenleader',
    'comma', 'hyphen', 'period', 'fraction', 'zerooldstyle', 'oneoldstyle', 'twooldstyle', 'threeoldstyle',
    'fouroldstyle', 'fiveoldstyle', 'sixoldstyle', 'sevenoldstyle', 'eightoldstyle', 'nineoldstyle', 'colon',
    'semicolon', 'commasuperior', 'threequartersemdash', 'periodsuperior', 'questionsmall', '', 'asuperior',
    'bsuperior', 'centsuperior', 'dsuperior', 'esuperior', '', '', 'isuperior', '', '', 'lsuperior', 'msuperior',
    'nsuperior', 'osuperior', '', '', 'rsuperior', 'ssuperior', 'tsuperior', '', 'ff', 'fi', 'fl', 'ffi', 'ffl',
    'parenleftinferior', '', 'parenrightinferior', 'Circumflexsmall', 'hyphensuperior', 'Gravesmall', 'Asmall',
    'Bsmall', 'Csmall', 'Dsmall', 'Esmall', 'Fsmall', 'Gsmall', 'Hsmall', 'Ismall', 'Jsmall', 'Ksmall', 'Lsmall',
    'Msmall', 'Nsmall', 'Osmall', 'Psmall', 'Qsmall', 'Rsmall', 'Ssmall', 'Tsmall', 'Usmall', 'Vsmall', 'Wsmall',
    'Xsmall', 'Ysmall', 'Zsmall', 'colonmonetary', 'onefitted', 'rupiah', 'Tildesmall', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    'exclamdownsmall', 'centoldstyle', 'Lslashsmall', '', '', 'Scaronsmall', 'Zcaronsmall', 'Dieresissmall',
    'Brevesmall', 'Caronsmall', '', 'Dotaccentsmall', '', '', 'Macronsmall', '', '', 'figuredash', 'hypheninferior',
    '', '', 'Ogoneksmall', 'Ringsmall', 'Cedillasmall', '', '', '', 'onequarter', 'onehalf', 'threequarters',
    'questiondownsmall', 'oneeighth', 'threeeighths', 'fiveeighths', 'seveneighths', 'onethird', 'twothirds', '',
    '', 'zerosuperior', 'onesuperior', 'twosuperior', 'threesuperior', 'foursuperior', 'fivesuperior',
    'sixsuperior', 'sevensuperior', 'eightsuperior', 'ninesuperior', 'zeroinferior', 'oneinferior', 'twoinferior',
    'threeinferior', 'fourinferior', 'fiveinferior', 'sixinferior', 'seveninferior', 'eightinferior',
    'nineinferior', 'centinferior', 'dollarinferior', 'periodinferior', 'commainferior', 'Agravesmall',
    'Aacutesmall', 'Acircumflexsmall', 'Atildesmall', 'Adieresissmall', 'Aringsmall', 'AEsmall', 'Ccedillasmall',
    'Egravesmall', 'Eacutesmall', 'Ecircumflexsmall', 'Edieresissmall', 'Igravesmall', 'Iacutesmall',
    'Icircumflexsmall', 'Idieresissmall', 'Ethsmall', 'Ntildesmall', 'Ogravesmall', 'Oacutesmall',
    'Ocircumflexsmall', 'Otildesmall', 'Odieresissmall', 'OEsmall', 'Oslashsmall', 'Ugravesmall', 'Uacutesmall',
    'Ucircumflexsmall', 'Udieresissmall', 'Yacutesmall', 'Thornsmall', 'Ydieresissmall'];

var standardNames = [
    '.notdef', '.null', 'nonmarkingreturn', 'space', 'exclam', 'quotedbl', 'numbersign', 'dollar', 'percent',
    'ampersand', 'quotesingle', 'parenleft', 'parenright', 'asterisk', 'plus', 'comma', 'hyphen', 'period', 'slash',
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'colon', 'semicolon', 'less',
    'equal', 'greater', 'question', 'at', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'bracketleft', 'backslash', 'bracketright',
    'asciicircum', 'underscore', 'grave', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'braceleft', 'bar', 'braceright', 'asciitilde',
    'Adieresis', 'Aring', 'Ccedilla', 'Eacute', 'Ntilde', 'Odieresis', 'Udieresis', 'aacute', 'agrave',
    'acircumflex', 'adieresis', 'atilde', 'aring', 'ccedilla', 'eacute', 'egrave', 'ecircumflex', 'edieresis',
    'iacute', 'igrave', 'icircumflex', 'idieresis', 'ntilde', 'oacute', 'ograve', 'ocircumflex', 'odieresis',
    'otilde', 'uacute', 'ugrave', 'ucircumflex', 'udieresis', 'dagger', 'degree', 'cent', 'sterling', 'section',
    'bullet', 'paragraph', 'germandbls', 'registered', 'copyright', 'trademark', 'acute', 'dieresis', 'notequal',
    'AE', 'Oslash', 'infinity', 'plusminus', 'lessequal', 'greaterequal', 'yen', 'mu', 'partialdiff', 'summation',
    'product', 'pi', 'integral', 'ordfeminine', 'ordmasculine', 'Omega', 'ae', 'oslash', 'questiondown',
    'exclamdown', 'logicalnot', 'radical', 'florin', 'approxequal', 'Delta', 'guillemotleft', 'guillemotright',
    'ellipsis', 'nonbreakingspace', 'Agrave', 'Atilde', 'Otilde', 'OE', 'oe', 'endash', 'emdash', 'quotedblleft',
    'quotedblright', 'quoteleft', 'quoteright', 'divide', 'lozenge', 'ydieresis', 'Ydieresis', 'fraction',
    'currency', 'guilsinglleft', 'guilsinglright', 'fi', 'fl', 'daggerdbl', 'periodcentered', 'quotesinglbase',
    'quotedblbase', 'perthousand', 'Acircumflex', 'Ecircumflex', 'Aacute', 'Edieresis', 'Egrave', 'Iacute',
    'Icircumflex', 'Idieresis', 'Igrave', 'Oacute', 'Ocircumflex', 'apple', 'Ograve', 'Uacute', 'Ucircumflex',
    'Ugrave', 'dotlessi', 'circumflex', 'tilde', 'macron', 'breve', 'dotaccent', 'ring', 'cedilla', 'hungarumlaut',
    'ogonek', 'caron', 'Lslash', 'lslash', 'Scaron', 'scaron', 'Zcaron', 'zcaron', 'brokenbar', 'Eth', 'eth',
    'Yacute', 'yacute', 'Thorn', 'thorn', 'minus', 'multiply', 'onesuperior', 'twosuperior', 'threesuperior',
    'onehalf', 'onequarter', 'threequarters', 'franc', 'Gbreve', 'gbreve', 'Idotaccent', 'Scedilla', 'scedilla',
    'Cacute', 'cacute', 'Ccaron', 'ccaron', 'dcroat'];

// This is the encoding used for fonts created from scratch.
// It loops through all glyphs and finds the appropriate unicode value.
// Since it's linear time, other encodings will be faster.
function DefaultEncoding(font) {
    this.font = font;
}

DefaultEncoding.prototype.charToGlyphIndex = function(c) {
    var code = c.charCodeAt(0);
    var glyphs = this.font.glyphs;
    if (glyphs) {
        for (var i = 0; i < glyphs.length; i += 1) {
            var glyph = glyphs.get(i);
            for (var j = 0; j < glyph.unicodes.length; j += 1) {
                if (glyph.unicodes[j] === code) {
                    return i;
                }
            }
        }
    } else {
        return null;
    }
};

function CmapEncoding(cmap) {
    this.cmap = cmap;
}

CmapEncoding.prototype.charToGlyphIndex = function(c) {
    return this.cmap.glyphIndexMap[c.charCodeAt(0)] || 0;
};

function CffEncoding(encoding, charset) {
    this.encoding = encoding;
    this.charset = charset;
}

CffEncoding.prototype.charToGlyphIndex = function(s) {
    var code = s.charCodeAt(0);
    var charName = this.encoding[code];
    return this.charset.indexOf(charName);
};

function GlyphNames(post) {
    var i;
    switch (post.version) {
    case 1:
        this.names = exports.standardNames.slice();
        break;
    case 2:
        this.names = new Array(post.numberOfGlyphs);
        for (i = 0; i < post.numberOfGlyphs; i++) {
            if (post.glyphNameIndex[i] < exports.standardNames.length) {
                this.names[i] = exports.standardNames[post.glyphNameIndex[i]];
            } else {
                this.names[i] = post.names[post.glyphNameIndex[i] - exports.standardNames.length];
            }
        }

        break;
    case 2.5:
        this.names = new Array(post.numberOfGlyphs);
        for (i = 0; i < post.numberOfGlyphs; i++) {
            this.names[i] = exports.standardNames[i + post.glyphNameIndex[i]];
        }

        break;
    case 3:
        this.names = [];
        break;
    }
}

GlyphNames.prototype.nameToGlyphIndex = function(name) {
    return this.names.indexOf(name);
};

GlyphNames.prototype.glyphIndexToName = function(gid) {
    return this.names[gid];
};

function addGlyphNames(font) {
    var glyph;
    var glyphIndexMap = font.tables.cmap.glyphIndexMap;
    var charCodes = Object.keys(glyphIndexMap);

    for (var i = 0; i < charCodes.length; i += 1) {
        var c = charCodes[i];
        var glyphIndex = glyphIndexMap[c];
        glyph = font.glyphs.get(glyphIndex);
        glyph.addUnicode(parseInt(c));
    }

    for (i = 0; i < font.glyphs.length; i += 1) {
        glyph = font.glyphs.get(i);
        if (font.cffEncoding) {
            glyph.name = font.cffEncoding.charset[i];
        } else {
            glyph.name = font.glyphNames.glyphIndexToName(i);
        }
    }
}

exports.cffStandardStrings = cffStandardStrings;
exports.cffStandardEncoding = cffStandardEncoding;
exports.cffExpertEncoding = cffExpertEncoding;
exports.standardNames = standardNames;
exports.DefaultEncoding = DefaultEncoding;
exports.CmapEncoding = CmapEncoding;
exports.CffEncoding = CffEncoding;
exports.GlyphNames = GlyphNames;
exports.addGlyphNames = addGlyphNames;

},{}],5:[function(_dereq_,module,exports){
// The Font object

'use strict';

var path = _dereq_('./path');
var sfnt = _dereq_('./tables/sfnt');
var encoding = _dereq_('./encoding');
var glyphset = _dereq_('./glyphset');

// A Font represents a loaded OpenType font file.
// It contains a set of glyphs and methods to draw text on a drawing context,
// or to get a path representing the text.
function Font(options) {
    options = options || {};

    // OS X will complain if the names are empty, so we put a single space everywhere by default.
    this.familyName = options.familyName || ' ';
    this.styleName = options.styleName || ' ';
    this.designer = options.designer || ' ';
    this.designerURL = options.designerURL || ' ';
    this.manufacturer = options.manufacturer || ' ';
    this.manufacturerURL = options.manufacturerURL || ' ';
    this.license = options.license || ' ';
    this.licenseURL = options.licenseURL || ' ';
    this.version = options.version || 'Version 0.1';
    this.description = options.description || ' ';
    this.copyright = options.copyright || ' ';
    this.trademark = options.trademark || ' ';
    this.unitsPerEm = options.unitsPerEm || 1000;
    this.ascender = options.ascender;
    this.descender = options.descender;
    this.supported = true;
    this.glyphs = new glyphset.GlyphSet(this, options.glyphs || []);
    this.encoding = new encoding.DefaultEncoding(this);
    this.tables = {};
}

// Check if the font has a glyph for the given character.
Font.prototype.hasChar = function(c) {
    return this.encoding.charToGlyphIndex(c) !== null;
};

// Convert the given character to a single glyph index.
// Note that this function assumes that there is a one-to-one mapping between
// the given character and a glyph; for complex scripts this might not be the case.
Font.prototype.charToGlyphIndex = function(s) {
    return this.encoding.charToGlyphIndex(s);
};

// Convert the given character to a single Glyph object.
// Note that this function assumes that there is a one-to-one mapping between
// the given character and a glyph; for complex scripts this might not be the case.
Font.prototype.charToGlyph = function(c) {
    var glyphIndex = this.charToGlyphIndex(c);
    var glyph = this.glyphs.get(glyphIndex);
    if (!glyph) {
        // .notdef
        glyph = this.glyphs.get(0);
    }

    return glyph;
};

// Convert the given text to a list of Glyph objects.
// Note that there is no strict one-to-one mapping between characters and
// glyphs, so the list of returned glyphs can be larger or smaller than the
// length of the given string.
Font.prototype.stringToGlyphs = function(s) {
    var glyphs = [];
    for (var i = 0; i < s.length; i += 1) {
        var c = s[i];
        glyphs.push(this.charToGlyph(c));
    }

    return glyphs;
};

Font.prototype.nameToGlyphIndex = function(name) {
    return this.glyphNames.nameToGlyphIndex(name);
};

Font.prototype.nameToGlyph = function(name) {
    var glyphIndex = this.nametoGlyphIndex(name);
    var glyph = this.glyphs.get(glyphIndex);
    if (!glyph) {
        // .notdef
        glyph = this.glyphs.get(0);
    }

    return glyph;
};

Font.prototype.glyphIndexToName = function(gid) {
    if (!this.glyphNames.glyphIndexToName) {
        return '';
    }

    return this.glyphNames.glyphIndexToName(gid);
};

// Retrieve the value of the kerning pair between the left glyph (or its index)
// and the right glyph (or its index). If no kerning pair is found, return 0.
// The kerning value gets added to the advance width when calculating the spacing
// between glyphs.
Font.prototype.getKerningValue = function(leftGlyph, rightGlyph) {
    leftGlyph = leftGlyph.index || leftGlyph;
    rightGlyph = rightGlyph.index || rightGlyph;
    var gposKerning = this.getGposKerningValue;
    return gposKerning ? gposKerning(leftGlyph, rightGlyph) :
        (this.kerningPairs[leftGlyph + ',' + rightGlyph] || 0);
};

// Helper function that invokes the given callback for each glyph in the given text.
// The callback gets `(glyph, x, y, fontSize, options)`.
Font.prototype.forEachGlyph = function(text, x, y, fontSize, options, callback) {
    if (!this.supported) {
        return;
    }

    x = x !== undefined ? x : 0;
    y = y !== undefined ? y : 0;
    fontSize = fontSize !== undefined ? fontSize : 72;
    options = options || {};
    var kerning = options.kerning === undefined ? true : options.kerning;
    var fontScale = 1 / this.unitsPerEm * fontSize;
    var glyphs = this.stringToGlyphs(text);
    for (var i = 0; i < glyphs.length; i += 1) {
        var glyph = glyphs[i];
        callback(glyph, x, y, fontSize, options);
        if (glyph.advanceWidth) {
            x += glyph.advanceWidth * fontScale;
        }

        if (kerning && i < glyphs.length - 1) {
            var kerningValue = this.getKerningValue(glyph, glyphs[i + 1]);
            x += kerningValue * fontScale;
        }
    }
};

// Create a Path object that represents the given text.
//
// text - The text to create.
// x - Horizontal position of the beginning of the text. (default: 0)
// y - Vertical position of the *baseline* of the text. (default: 0)
// fontSize - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`. (default: 72)
// Options is an optional object that contains:
// - kerning - Whether to take kerning information into account. (default: true)
//
// Returns a Path object.
Font.prototype.getPath = function(text, x, y, fontSize, options) {
    var fullPath = new path.Path();
    this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
        var glyphPath = glyph.getPath(gX, gY, gFontSize);
        fullPath.extend(glyphPath);
    });

    return fullPath;
};

// Draw the text on the given drawing context.
//
// ctx - A 2D drawing context, like Canvas.
// text - The text to create.
// x - Horizontal position of the beginning of the text. (default: 0)
// y - Vertical position of the *baseline* of the text. (default: 0)
// fontSize - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`. (default: 72)
// Options is an optional object that contains:
// - kerning - Whether to take kerning information into account. (default: true)
Font.prototype.draw = function(ctx, text, x, y, fontSize, options) {
    this.getPath(text, x, y, fontSize, options).draw(ctx);
};

// Draw the points of all glyphs in the text.
// On-curve points will be drawn in blue, off-curve points will be drawn in red.
//
// ctx - A 2D drawing context, like Canvas.
// text - The text to create.
// x - Horizontal position of the beginning of the text. (default: 0)
// y - Vertical position of the *baseline* of the text. (default: 0)
// fontSize - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`. (default: 72)
// Options is an optional object that contains:
// - kerning - Whether to take kerning information into account. (default: true)
Font.prototype.drawPoints = function(ctx, text, x, y, fontSize, options) {
    this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
        glyph.drawPoints(ctx, gX, gY, gFontSize);
    });
};

// Draw lines indicating important font measurements for all glyphs in the text.
// Black lines indicate the origin of the coordinate system (point 0,0).
// Blue lines indicate the glyph bounding box.
// Green line indicates the advance width of the glyph.
//
// ctx - A 2D drawing context, like Canvas.
// text - The text to create.
// x - Horizontal position of the beginning of the text. (default: 0)
// y - Vertical position of the *baseline* of the text. (default: 0)
// fontSize - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`. (default: 72)
// Options is an optional object that contains:
// - kerning - Whether to take kerning information into account. (default: true)
Font.prototype.drawMetrics = function(ctx, text, x, y, fontSize, options) {
    this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
        glyph.drawMetrics(ctx, gX, gY, gFontSize);
    });
};

// Validate
Font.prototype.validate = function() {
    var warnings = [];
    var _this = this;

    function assert(predicate, message) {
        if (!predicate) {
            warnings.push(message);
        }
    }

    function assertStringAttribute(attrName) {
        assert(_this[attrName] && _this[attrName].trim().length > 0, 'No ' + attrName + ' specified.');
    }

    // Identification information
    assertStringAttribute('familyName');
    assertStringAttribute('weightName');
    assertStringAttribute('manufacturer');
    assertStringAttribute('copyright');
    assertStringAttribute('version');

    // Dimension information
    assert(this.unitsPerEm > 0, 'No unitsPerEm specified.');
};

// Convert the font object to a SFNT data structure.
// This structure contains all the necessary tables and metadata to create a binary OTF file.
Font.prototype.toTables = function() {
    return sfnt.fontToTable(this);
};

Font.prototype.toBuffer = function() {
    var sfntTable = this.toTables();
    var bytes = sfntTable.encode();
    var buffer = new ArrayBuffer(bytes.length);
    var intArray = new Uint8Array(buffer);
    for (var i = 0; i < bytes.length; i++) {
        intArray[i] = bytes[i];
    }

    return buffer;
};

// Initiate a download of the OpenType font.
Font.prototype.download = function() {
    var fileName = this.familyName.replace(/\s/g, '') + '-' + this.styleName + '.otf';
    var buffer = this.toBuffer();

    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(window.TEMPORARY, buffer.byteLength, function(fs) {
        fs.root.getFile(fileName, {create: true}, function(fileEntry) {
            fileEntry.createWriter(function(writer) {
                var dataView = new DataView(buffer);
                var blob = new Blob([dataView], {type: 'font/opentype'});
                writer.write(blob);

                writer.addEventListener('writeend', function() {
                    // Navigating to the file will download it.
                    location.href = fileEntry.toURL();
                }, false);
            });
        });
    },

    function(err) {
        throw err;
    });
};

exports.Font = Font;

},{"./encoding":4,"./glyphset":7,"./path":10,"./tables/sfnt":25}],6:[function(_dereq_,module,exports){
// The Glyph object

'use strict';

var check = _dereq_('./check');
var draw = _dereq_('./draw');
var path = _dereq_('./path');

function getPathDefinition(glyph, path) {
    var _path = path || { commands: [] };
    return {
        configurable: true,

        get: function() {
            if (typeof _path === 'function') {
                _path = _path();
            }

            return _path;
        },

        set: function(p) {
            _path = p;
        }
    };
}

// A Glyph is an individual mark that often corresponds to a character.
// Some glyphs, such as ligatures, are a combination of many characters.
// Glyphs are the basic building blocks of a font.
//
// The `Glyph` class contains utility methods for drawing the path and its points.
function Glyph(options) {
    // By putting all the code on a prototype function (which is only declared once)
    // we reduce the memory requirements for larger fonts by some 2%
    this.bindConstructorValues(options);
}

Glyph.prototype.bindConstructorValues = function(options) {
    this.index = options.index || 0;

    // These three values cannnot be deferred for memory optimization:
    this.name = options.name || null;
    this.unicode = options.unicode || undefined;
    this.unicodes = options.unicodes || options.unicode !== undefined ? [options.unicode] : [];

    // But by binding these values only when necessary, we reduce can
    // the memory requirements by almost 3% for larger fonts.
    if (options.xMin) {
        this.xMin = options.xMin;
    }

    if (options.yMin) {
        this.yMin = options.yMin;
    }

    if (options.xMax) {
        this.xMax = options.xMax;
    }

    if (options.yMax) {
        this.yMax = options.yMax;
    }

    if (options.advanceWidth) {
        this.advanceWidth = options.advanceWidth;
    }

    // The path for a glyph is the most memory intensive, and is bound as a value
    // with a getter/setter to ensure we actually do path parsing only once the
    // path is actually needed by anything.
    Object.defineProperty(this, 'path', getPathDefinition(this, options.path));
};

Glyph.prototype.addUnicode = function(unicode) {
    if (this.unicodes.length === 0) {
        this.unicode = unicode;
    }

    this.unicodes.push(unicode);
};

// Convert the glyph to a Path we can draw on a drawing context.
//
// x - Horizontal position of the glyph. (default: 0)
// y - Vertical position of the *baseline* of the glyph. (default: 0)
// fontSize - Font size, in pixels (default: 72).
Glyph.prototype.getPath = function(x, y, fontSize) {
    x = x !== undefined ? x : 0;
    y = y !== undefined ? y : 0;
    fontSize = fontSize !== undefined ? fontSize : 72;
    var scale = 1 / this.path.unitsPerEm * fontSize;
    var p = new path.Path();
    var commands = this.path.commands;
    for (var i = 0; i < commands.length; i += 1) {
        var cmd = commands[i];
        if (cmd.type === 'M') {
            p.moveTo(x + (cmd.x * scale), y + (-cmd.y * scale));
        } else if (cmd.type === 'L') {
            p.lineTo(x + (cmd.x * scale), y + (-cmd.y * scale));
        } else if (cmd.type === 'Q') {
            p.quadraticCurveTo(x + (cmd.x1 * scale), y + (-cmd.y1 * scale),
                               x + (cmd.x * scale), y + (-cmd.y * scale));
        } else if (cmd.type === 'C') {
            p.curveTo(x + (cmd.x1 * scale), y + (-cmd.y1 * scale),
                      x + (cmd.x2 * scale), y + (-cmd.y2 * scale),
                      x + (cmd.x * scale), y + (-cmd.y * scale));
        } else if (cmd.type === 'Z') {
            p.closePath();
        }
    }

    return p;
};

// Split the glyph into contours.
// This function is here for backwards compatibility, and to
// provide raw access to the TrueType glyph outlines.
Glyph.prototype.getContours = function() {
    if (this.points === undefined) {
        return [];
    }

    var contours = [];
    var currentContour = [];
    for (var i = 0; i < this.points.length; i += 1) {
        var pt = this.points[i];
        currentContour.push(pt);
        if (pt.lastPointOfContour) {
            contours.push(currentContour);
            currentContour = [];
        }
    }

    check.argument(currentContour.length === 0, 'There are still points left in the current contour.');
    return contours;
};

// Calculate the xMin/yMin/xMax/yMax/lsb/rsb for a Glyph.
Glyph.prototype.getMetrics = function() {
    var commands = this.path.commands;
    var xCoords = [];
    var yCoords = [];
    for (var i = 0; i < commands.length; i += 1) {
        var cmd = commands[i];
        if (cmd.type !== 'Z') {
            xCoords.push(cmd.x);
            yCoords.push(cmd.y);
        }

        if (cmd.type === 'Q' || cmd.type === 'C') {
            xCoords.push(cmd.x1);
            yCoords.push(cmd.y1);
        }

        if (cmd.type === 'C') {
            xCoords.push(cmd.x2);
            yCoords.push(cmd.y2);
        }
    }

    var metrics = {
        xMin: Math.min.apply(null, xCoords),
        yMin: Math.min.apply(null, yCoords),
        xMax: Math.max.apply(null, xCoords),
        yMax: Math.max.apply(null, yCoords),
        leftSideBearing: 0
    };
    metrics.rightSideBearing = this.advanceWidth - metrics.leftSideBearing - (metrics.xMax - metrics.xMin);
    return metrics;
};

// Draw the glyph on the given context.
//
// ctx - The drawing context.
// x - Horizontal position of the glyph. (default: 0)
// y - Vertical position of the *baseline* of the glyph. (default: 0)
// fontSize - Font size, in pixels (default: 72).
Glyph.prototype.draw = function(ctx, x, y, fontSize) {
    this.getPath(x, y, fontSize).draw(ctx);
};

// Draw the points of the glyph.
// On-curve points will be drawn in blue, off-curve points will be drawn in red.
//
// ctx - The drawing context.
// x - Horizontal position of the glyph. (default: 0)
// y - Vertical position of the *baseline* of the glyph. (default: 0)
// fontSize - Font size, in pixels (default: 72).
Glyph.prototype.drawPoints = function(ctx, x, y, fontSize) {

    function drawCircles(l, x, y, scale) {
        var PI_SQ = Math.PI * 2;
        ctx.beginPath();
        for (var j = 0; j < l.length; j += 1) {
            ctx.moveTo(x + (l[j].x * scale), y + (l[j].y * scale));
            ctx.arc(x + (l[j].x * scale), y + (l[j].y * scale), 2, 0, PI_SQ, false);
        }

        ctx.closePath();
        ctx.fill();
    }

    x = x !== undefined ? x : 0;
    y = y !== undefined ? y : 0;
    fontSize = fontSize !== undefined ? fontSize : 24;
    var scale = 1 / this.path.unitsPerEm * fontSize;

    var blueCircles = [];
    var redCircles = [];
    var path = this.path;
    for (var i = 0; i < path.commands.length; i += 1) {
        var cmd = path.commands[i];
        if (cmd.x !== undefined) {
            blueCircles.push({x: cmd.x, y: -cmd.y});
        }

        if (cmd.x1 !== undefined) {
            redCircles.push({x: cmd.x1, y: -cmd.y1});
        }

        if (cmd.x2 !== undefined) {
            redCircles.push({x: cmd.x2, y: -cmd.y2});
        }
    }

    ctx.fillStyle = 'blue';
    drawCircles(blueCircles, x, y, scale);
    ctx.fillStyle = 'red';
    drawCircles(redCircles, x, y, scale);
};

// Draw lines indicating important font measurements.
// Black lines indicate the origin of the coordinate system (point 0,0).
// Blue lines indicate the glyph bounding box.
// Green line indicates the advance width of the glyph.
//
// ctx - The drawing context.
// x - Horizontal position of the glyph. (default: 0)
// y - Vertical position of the *baseline* of the glyph. (default: 0)
// fontSize - Font size, in pixels (default: 72).
Glyph.prototype.drawMetrics = function(ctx, x, y, fontSize) {
    var scale;
    x = x !== undefined ? x : 0;
    y = y !== undefined ? y : 0;
    fontSize = fontSize !== undefined ? fontSize : 24;
    scale = 1 / this.path.unitsPerEm * fontSize;
    ctx.lineWidth = 1;

    // Draw the origin
    ctx.strokeStyle = 'black';
    draw.line(ctx, x, -10000, x, 10000);
    draw.line(ctx, -10000, y, 10000, y);

    // This code is here due to memory optimization: by not using
    // defaults in the constructor, we save a notable amount of memory.
    var xMin = this.xMin || 0;
    var yMin = this.yMin || 0;
    var xMax = this.xMax || 0;
    var yMax = this.yMax || 0;
    var advanceWidth = this.advanceWidth || 0;

    // Draw the glyph box
    ctx.strokeStyle = 'blue';
    draw.line(ctx, x + (xMin * scale), -10000, x + (xMin * scale), 10000);
    draw.line(ctx, x + (xMax * scale), -10000, x + (xMax * scale), 10000);
    draw.line(ctx, -10000, y + (-yMin * scale), 10000, y + (-yMin * scale));
    draw.line(ctx, -10000, y + (-yMax * scale), 10000, y + (-yMax * scale));

    // Draw the advance width
    ctx.strokeStyle = 'green';
    draw.line(ctx, x + (advanceWidth * scale), -10000, x + (advanceWidth * scale), 10000);
};

exports.Glyph = Glyph;

},{"./check":2,"./draw":3,"./path":10}],7:[function(_dereq_,module,exports){
// The GlyphSet object

'use strict';

var _glyph = _dereq_('./glyph');

// A GlyphSet represents all glyphs available in the font, but modelled using
// a deferred glyph loader, for retrieving glyphs only once they are absolutely
// necessary, to keep the memory footprint down.
function GlyphSet(font, glyphs) {
    this.font = font;
    this.glyphs = {};
    if (Array.isArray(glyphs)) {
        for (var i = 0; i < glyphs.length; i++) {
            this.glyphs[i] = glyphs[i];
        }
    }

    this.length = (glyphs && glyphs.length) || 0;
}

GlyphSet.prototype.get = function(index) {
    if (typeof this.glyphs[index] === 'function') {
        this.glyphs[index] = this.glyphs[index]();
    }

    return this.glyphs[index];
};

GlyphSet.prototype.push = function(index, loader) {
    this.glyphs[index] = loader;
    this.length++;
};

function glyphLoader(font, index) {
    return new _glyph.Glyph({index: index, font: font});
}

/**
 * Generate a stub glyph that can be filled with all metadata *except*
 * the "points" and "path" properties, which must be loaded only once
 * the glyph's path is actually requested for text shaping.
 */

function ttfGlyphLoader(font, index, parseGlyph, data, position, buildPath) {
    return function() {
        var glyph = new _glyph.Glyph({index: index, font: font});

        glyph.path = function() {
            parseGlyph(glyph, data, position);
            var path = buildPath(font.glyphs, glyph);
            path.unitsPerEm = font.unitsPerEm;
            return path;
        };

        return glyph;
    };
}

function cffGlyphLoader(font, index, parseCFFCharstring, charstring) {
    return function() {
        var glyph = new _glyph.Glyph({index: index, font: font});

        glyph.path = function() {
            var path = parseCFFCharstring(font, glyph, charstring);
            path.unitsPerEm = font.unitsPerEm;
            return path;
        };

        return glyph;
    };
}

exports.GlyphSet = GlyphSet;
exports.glyphLoader = glyphLoader;
exports.ttfGlyphLoader = ttfGlyphLoader;
exports.cffGlyphLoader = cffGlyphLoader;

},{"./glyph":6}],8:[function(_dereq_,module,exports){
// opentype.js
// https://github.com/nodebox/opentype.js
// (c) 2015 Frederik De Bleser
// opentype.js may be freely distributed under the MIT license.

/* global ArrayBuffer, DataView, Uint8Array, XMLHttpRequest  */

'use strict';

var encoding = _dereq_('./encoding');
var _font = _dereq_('./font');
var glyph = _dereq_('./glyph');
var parse = _dereq_('./parse');
var path = _dereq_('./path');

var cmap = _dereq_('./tables/cmap');
var cff = _dereq_('./tables/cff');
var glyf = _dereq_('./tables/glyf');
var gpos = _dereq_('./tables/gpos');
var head = _dereq_('./tables/head');
var hhea = _dereq_('./tables/hhea');
var hmtx = _dereq_('./tables/hmtx');
var kern = _dereq_('./tables/kern');
var loca = _dereq_('./tables/loca');
var maxp = _dereq_('./tables/maxp');
var _name = _dereq_('./tables/name');
var os2 = _dereq_('./tables/os2');
var post = _dereq_('./tables/post');

// File loaders /////////////////////////////////////////////////////////

// Convert a Node.js Buffer to an ArrayBuffer
function toArrayBuffer(buffer) {
    var arrayBuffer = new ArrayBuffer(buffer.length);
    var data = new Uint8Array(arrayBuffer);
    for (var i = 0; i < buffer.length; i += 1) {
        data[i] = buffer[i];
    }

    return arrayBuffer;
}

function loadFromFile(path, callback) {
    var fs = _dereq_('fs');
    fs.readFile(path, function(err, buffer) {
        if (err) {
            return callback(err.message);
        }

        callback(null, toArrayBuffer(buffer));
    });
}

function loadFromUrl(url, callback) {
    var request = new XMLHttpRequest();
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
        if (request.status !== 200) {
            return callback('Font could not be loaded: ' + request.statusText);
        }

        return callback(null, request.response);
    };

    request.send();
}

// Public API ///////////////////////////////////////////////////////////

// Parse the OpenType file data (as an ArrayBuffer) and return a Font object.
// If the file could not be parsed (most likely because it contains Postscript outlines)
// we return an empty Font object with the `supported` flag set to `false`.
function parseBuffer(buffer) {
    var indexToLocFormat;
    var hmtxOffset;
    var glyfOffset;
    var locaOffset;
    var cffOffset;
    var kernOffset;
    var gposOffset;

    // OpenType fonts use big endian byte ordering.
    // We can't rely on typed array view types, because they operate with the endianness of the host computer.
    // Instead we use DataViews where we can specify endianness.

    var font = new _font.Font();
    var data = new DataView(buffer, 0);

    var version = parse.getFixed(data, 0);
    if (version === 1.0) {
        font.outlinesFormat = 'truetype';
    } else {
        version = parse.getTag(data, 0);
        if (version === 'OTTO') {
            font.outlinesFormat = 'cff';
        } else {
            throw new Error('Unsupported OpenType version ' + version);
        }
    }

    var numTables = parse.getUShort(data, 4);

    // Offset into the table records.
    var p = 12;
    for (var i = 0; i < numTables; i += 1) {
        var tag = parse.getTag(data, p);
        var offset = parse.getULong(data, p + 8);
        switch (tag) {
        case 'cmap':
            font.tables.cmap = cmap.parse(data, offset);
            font.encoding = new encoding.CmapEncoding(font.tables.cmap);
            if (!font.encoding) {
                font.supported = false;
            }

            break;
        case 'head':
            font.tables.head = head.parse(data, offset);
            font.unitsPerEm = font.tables.head.unitsPerEm;
            indexToLocFormat = font.tables.head.indexToLocFormat;
            break;
        case 'hhea':
            font.tables.hhea = hhea.parse(data, offset);
            font.ascender = font.tables.hhea.ascender;
            font.descender = font.tables.hhea.descender;
            font.numberOfHMetrics = font.tables.hhea.numberOfHMetrics;
            break;
        case 'hmtx':
            hmtxOffset = offset;
            break;
        case 'maxp':
            font.tables.maxp = maxp.parse(data, offset);
            font.numGlyphs = font.tables.maxp.numGlyphs;
            break;
        case 'name':
            font.tables.name = _name.parse(data, offset);
            font.familyName = font.tables.name.fontFamily;
            font.styleName = font.tables.name.fontSubfamily;
            break;
        case 'OS/2':
            font.tables.os2 = os2.parse(data, offset);
            break;
        case 'post':
            font.tables.post = post.parse(data, offset);
            font.glyphNames = new encoding.GlyphNames(font.tables.post);
            break;
        case 'glyf':
            glyfOffset = offset;
            break;
        case 'loca':
            locaOffset = offset;
            break;
        case 'CFF ':
            cffOffset = offset;
            break;
        case 'kern':
            kernOffset = offset;
            break;
        case 'GPOS':
            gposOffset = offset;
            break;
        }
        p += 16;
    }

    if (glyfOffset && locaOffset) {
        var shortVersion = indexToLocFormat === 0;
        var locaTable = loca.parse(data, locaOffset, font.numGlyphs, shortVersion);
        font.glyphs = glyf.parse(data, glyfOffset, locaTable, font);
        hmtx.parse(data, hmtxOffset, font.numberOfHMetrics, font.numGlyphs, font.glyphs);
        encoding.addGlyphNames(font);
    } else if (cffOffset) {
        cff.parse(data, cffOffset, font);
        encoding.addGlyphNames(font);
    } else {
        font.supported = false;
    }

    if (font.supported) {
        if (kernOffset) {
            font.kerningPairs = kern.parse(data, kernOffset);
        } else {
            font.kerningPairs = {};
        }

        if (gposOffset) {
            gpos.parse(data, gposOffset, font);
        }
    }

    return font;
}

// Asynchronously load the font from a URL or a filesystem. When done, call the callback
// with two arguments `(err, font)`. The `err` will be null on success,
// the `font` is a Font object.
//
// We use the node.js callback convention so that
// opentype.js can integrate with frameworks like async.js.
function load(url, callback) {
    var isNode = typeof window === 'undefined';
    var loadFn = isNode ? loadFromFile : loadFromUrl;
    loadFn(url, function(err, arrayBuffer) {
        if (err) {
            return callback(err);
        }

        var font = parseBuffer(arrayBuffer);
        if (!font.supported) {
            return callback('Font is not supported (is this a Postscript font?)');
        }

        return callback(null, font);
    });
}

exports._parse = parse;
exports.Font = _font.Font;
exports.Glyph = glyph.Glyph;
exports.Path = path.Path;
exports.parse = parseBuffer;
exports.load = load;

},{"./encoding":4,"./font":5,"./glyph":6,"./parse":9,"./path":10,"./tables/cff":12,"./tables/cmap":13,"./tables/glyf":14,"./tables/gpos":15,"./tables/head":16,"./tables/hhea":17,"./tables/hmtx":18,"./tables/kern":19,"./tables/loca":20,"./tables/maxp":21,"./tables/name":22,"./tables/os2":23,"./tables/post":24,"fs":1}],9:[function(_dereq_,module,exports){
// Parsing utility functions

'use strict';

// Retrieve an unsigned byte from the DataView.
exports.getByte = function getByte(dataView, offset) {
    return dataView.getUint8(offset);
};

exports.getCard8 = exports.getByte;

// Retrieve an unsigned 16-bit short from the DataView.
// The value is stored in big endian.
exports.getUShort = function(dataView, offset) {
    return dataView.getUint16(offset, false);
};

exports.getCard16 = exports.getUShort;

// Retrieve a signed 16-bit short from the DataView.
// The value is stored in big endian.
exports.getShort = function(dataView, offset) {
    return dataView.getInt16(offset, false);
};

// Retrieve an unsigned 32-bit long from the DataView.
// The value is stored in big endian.
exports.getULong = function(dataView, offset) {
    return dataView.getUint32(offset, false);
};

// Retrieve a 32-bit signed fixed-point number (16.16) from the DataView.
// The value is stored in big endian.
exports.getFixed = function(dataView, offset) {
    var decimal = dataView.getInt16(offset, false);
    var fraction = dataView.getUint16(offset + 2, false);
    return decimal + fraction / 65535;
};

// Retrieve a 4-character tag from the DataView.
// Tags are used to identify tables.
exports.getTag = function(dataView, offset) {
    var tag = '';
    for (var i = offset; i < offset + 4; i += 1) {
        tag += String.fromCharCode(dataView.getInt8(i));
    }

    return tag;
};

// Retrieve an offset from the DataView.
// Offsets are 1 to 4 bytes in length, depending on the offSize argument.
exports.getOffset = function(dataView, offset, offSize) {
    var v = 0;
    for (var i = 0; i < offSize; i += 1) {
        v <<= 8;
        v += dataView.getUint8(offset + i);
    }

    return v;
};

// Retrieve a number of bytes from start offset to the end offset from the DataView.
exports.getBytes = function(dataView, startOffset, endOffset) {
    var bytes = [];
    for (var i = startOffset; i < endOffset; i += 1) {
        bytes.push(dataView.getUint8(i));
    }

    return bytes;
};

// Convert the list of bytes to a string.
exports.bytesToString = function(bytes) {
    var s = '';
    for (var i = 0; i < bytes.length; i += 1) {
        s += String.fromCharCode(bytes[i]);
    }

    return s;
};

var typeOffsets = {
    byte: 1,
    uShort: 2,
    short: 2,
    uLong: 4,
    fixed: 4,
    longDateTime: 8,
    tag: 4
};

// A stateful parser that changes the offset whenever a value is retrieved.
// The data is a DataView.
function Parser(data, offset) {
    this.data = data;
    this.offset = offset;
    this.relativeOffset = 0;
}

Parser.prototype.parseByte = function() {
    var v = this.data.getUint8(this.offset + this.relativeOffset);
    this.relativeOffset += 1;
    return v;
};

Parser.prototype.parseChar = function() {
    var v = this.data.getInt8(this.offset + this.relativeOffset);
    this.relativeOffset += 1;
    return v;
};

Parser.prototype.parseCard8 = Parser.prototype.parseByte;

Parser.prototype.parseUShort = function() {
    var v = this.data.getUint16(this.offset + this.relativeOffset);
    this.relativeOffset += 2;
    return v;
};

Parser.prototype.parseCard16 = Parser.prototype.parseUShort;
Parser.prototype.parseSID = Parser.prototype.parseUShort;
Parser.prototype.parseOffset16 = Parser.prototype.parseUShort;

Parser.prototype.parseShort = function() {
    var v = this.data.getInt16(this.offset + this.relativeOffset);
    this.relativeOffset += 2;
    return v;
};

Parser.prototype.parseF2Dot14 = function() {
    var v = this.data.getInt16(this.offset + this.relativeOffset) / 16384;
    this.relativeOffset += 2;
    return v;
};

Parser.prototype.parseULong = function() {
    var v = exports.getULong(this.data, this.offset + this.relativeOffset);
    this.relativeOffset += 4;
    return v;
};

Parser.prototype.parseFixed = function() {
    var v = exports.getFixed(this.data, this.offset + this.relativeOffset);
    this.relativeOffset += 4;
    return v;
};

Parser.prototype.parseOffset16List =
Parser.prototype.parseUShortList = function(count) {
    var offsets = new Array(count);
    var dataView = this.data;
    var offset = this.offset + this.relativeOffset;
    for (var i = 0; i < count; i++) {
        offsets[i] = exports.getUShort(dataView, offset);
        offset += 2;
    }

    this.relativeOffset += count * 2;
    return offsets;
};

Parser.prototype.parseString = function(length) {
    var dataView = this.data;
    var offset = this.offset + this.relativeOffset;
    var string = '';
    this.relativeOffset += length;
    for (var i = 0; i < length; i++) {
        string += String.fromCharCode(dataView.getUint8(offset + i));
    }

    return string;
};

Parser.prototype.parseTag = function() {
    return this.parseString(4);
};

// LONGDATETIME is a 64-bit integer.
// JavaScript and unix timestamps traditionally use 32 bits, so we
// only take the last 32 bits.
Parser.prototype.parseLongDateTime = function() {
    var v = exports.getULong(this.data, this.offset + this.relativeOffset + 4);
    this.relativeOffset += 8;
    return v;
};

Parser.prototype.parseFixed = function() {
    var v = exports.getULong(this.data, this.offset + this.relativeOffset);
    this.relativeOffset += 4;
    return v / 65536;
};

Parser.prototype.parseVersion = function() {
    var major = exports.getUShort(this.data, this.offset + this.relativeOffset);

    // How to interpret the minor version is very vague in the spec. 0x5000 is 5, 0x1000 is 1
    // This returns the correct number if minor = 0xN000 where N is 0-9
    var minor = exports.getUShort(this.data, this.offset + this.relativeOffset + 2);
    this.relativeOffset += 4;
    return major + minor / 0x1000 / 10;
};

Parser.prototype.skip = function(type, amount) {
    if (amount === undefined) {
        amount = 1;
    }

    this.relativeOffset += typeOffsets[type] * amount;
};

exports.Parser = Parser;

},{}],10:[function(_dereq_,module,exports){
// Geometric objects

'use strict';

// A bézier path containing a set of path commands similar to a SVG path.
// Paths can be drawn on a context using `draw`.
function Path() {
    this.commands = [];
    this.fill = 'black';
    this.stroke = null;
    this.strokeWidth = 1;
}

Path.prototype.moveTo = function(x, y) {
    this.commands.push({
        type: 'M',
        x: x,
        y: y
    });
};

Path.prototype.lineTo = function(x, y) {
    this.commands.push({
        type: 'L',
        x: x,
        y: y
    });
};

Path.prototype.curveTo = Path.prototype.bezierCurveTo = function(x1, y1, x2, y2, x, y) {
    this.commands.push({
        type: 'C',
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        x: x,
        y: y
    });
};

Path.prototype.quadTo = Path.prototype.quadraticCurveTo = function(x1, y1, x, y) {
    this.commands.push({
        type: 'Q',
        x1: x1,
        y1: y1,
        x: x,
        y: y
    });
};

Path.prototype.close = Path.prototype.closePath = function() {
    this.commands.push({
        type: 'Z'
    });
};

// Add the given path or list of commands to the commands of this path.
Path.prototype.extend = function(pathOrCommands) {
    if (pathOrCommands.commands) {
        pathOrCommands = pathOrCommands.commands;
    }

    Array.prototype.push.apply(this.commands, pathOrCommands);
};

// Draw the path to a 2D context.
Path.prototype.draw = function(ctx) {
    ctx.beginPath();
    for (var i = 0; i < this.commands.length; i += 1) {
        var cmd = this.commands[i];
        if (cmd.type === 'M') {
            ctx.moveTo(cmd.x, cmd.y);
        } else if (cmd.type === 'L') {
            ctx.lineTo(cmd.x, cmd.y);
        } else if (cmd.type === 'C') {
            ctx.bezierCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        } else if (cmd.type === 'Q') {
            ctx.quadraticCurveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
        } else if (cmd.type === 'Z') {
            ctx.closePath();
        }
    }

    if (this.fill) {
        ctx.fillStyle = this.fill;
        ctx.fill();
    }

    if (this.stroke) {
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = this.strokeWidth;
        ctx.stroke();
    }
};

// Convert the Path to a string of path data instructions
// See http://www.w3.org/TR/SVG/paths.html#PathData
// Parameters:
// - decimalPlaces: The amount of decimal places for floating-point values (default: 2)
Path.prototype.toPathData = function(decimalPlaces) {
    decimalPlaces = decimalPlaces !== undefined ? decimalPlaces : 2;

    function floatToString(v) {
        if (Math.round(v) === v) {
            return '' + Math.round(v);
        } else {
            return v.toFixed(decimalPlaces);
        }
    }

    function packValues() {
        var s = '';
        for (var i = 0; i < arguments.length; i += 1) {
            var v = arguments[i];
            if (v >= 0 && i > 0) {
                s += ' ';
            }

            s += floatToString(v);
        }

        return s;
    }

    var d = '';
    for (var i = 0; i < this.commands.length; i += 1) {
        var cmd = this.commands[i];
        if (cmd.type === 'M') {
            d += 'M' + packValues(cmd.x, cmd.y);
        } else if (cmd.type === 'L') {
            d += 'L' + packValues(cmd.x, cmd.y);
        } else if (cmd.type === 'C') {
            d += 'C' + packValues(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        } else if (cmd.type === 'Q') {
            d += 'Q' + packValues(cmd.x1, cmd.y1, cmd.x, cmd.y);
        } else if (cmd.type === 'Z') {
            d += 'Z';
        }
    }

    return d;
};

// Convert the path to a SVG <path> element, as a string.
// Parameters:
// - decimalPlaces: The amount of decimal places for floating-point values (default: 2)
Path.prototype.toSVG = function(decimalPlaces) {
    var svg = '<path d="';
    svg += this.toPathData(decimalPlaces);
    svg += '"';
    if (this.fill & this.fill !== 'black') {
        if (this.fill === null) {
            svg += ' fill="none"';
        } else {
            svg += ' fill="' + this.fill + '"';
        }
    }

    if (this.stroke) {
        svg += ' stroke="' + this.stroke + '" stroke-width="' + this.strokeWidth + '"';
    }

    svg += '/>';
    return svg;
};

exports.Path = Path;

},{}],11:[function(_dereq_,module,exports){
// Table metadata

'use strict';

var check = _dereq_('./check');
var encode = _dereq_('./types').encode;
var sizeOf = _dereq_('./types').sizeOf;

function Table(tableName, fields, options) {
    var i;
    for (i = 0; i < fields.length; i += 1) {
        var field = fields[i];
        this[field.name] = field.value;
    }

    this.tableName = tableName;
    this.fields = fields;
    if (options) {
        var optionKeys = Object.keys(options);
        for (i = 0; i < optionKeys.length; i += 1) {
            var k = optionKeys[i];
            var v = options[k];
            if (this[k] !== undefined) {
                this[k] = v;
            }
        }
    }
}

Table.prototype.sizeOf = function() {
    var v = 0;
    for (var i = 0; i < this.fields.length; i += 1) {
        var field = this.fields[i];
        var value = this[field.name];
        if (value === undefined) {
            value = field.value;
        }

        if (typeof value.sizeOf === 'function') {
            v += value.sizeOf();
        } else {
            var sizeOfFunction = sizeOf[field.type];
            check.assert(typeof sizeOfFunction === 'function', 'Could not find sizeOf function for field' + field.name);
            v += sizeOfFunction(value);
        }
    }

    return v;
};

Table.prototype.encode = function() {
    return encode.TABLE(this);
};

exports.Table = Table;

},{"./check":2,"./types":26}],12:[function(_dereq_,module,exports){
// The `CFF` table contains the glyph outlines in PostScript format.
// https://www.microsoft.com/typography/OTSPEC/cff.htm
// http://download.microsoft.com/download/8/0/1/801a191c-029d-4af3-9642-555f6fe514ee/cff.pdf
// http://download.microsoft.com/download/8/0/1/801a191c-029d-4af3-9642-555f6fe514ee/type2.pdf

'use strict';

var encoding = _dereq_('../encoding');
var glyphset = _dereq_('../glyphset');
var parse = _dereq_('../parse');
var path = _dereq_('../path');
var table = _dereq_('../table');

// Custom equals function that can also check lists.
function equals(a, b) {
    if (a === b) {
        return true;
    } else if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return false;
        }

        for (var i = 0; i < a.length; i += 1) {
            if (!equals(a[i], b[i])) {
                return false;
            }
        }

        return true;
    } else {
        return false;
    }
}

// Parse a `CFF` INDEX array.
// An index array consists of a list of offsets, then a list of objects at those offsets.
function parseCFFIndex(data, start, conversionFn) {
    //var i, objectOffset, endOffset;
    var offsets = [];
    var objects = [];
    var count = parse.getCard16(data, start);
    var i;
    var objectOffset;
    var endOffset;
    if (count !== 0) {
        var offsetSize = parse.getByte(data, start + 2);
        objectOffset = start + ((count + 1) * offsetSize) + 2;
        var pos = start + 3;
        for (i = 0; i < count + 1; i += 1) {
            offsets.push(parse.getOffset(data, pos, offsetSize));
            pos += offsetSize;
        }

        // The total size of the index array is 4 header bytes + the value of the last offset.
        endOffset = objectOffset + offsets[count];
    } else {
        endOffset = start + 2;
    }

    for (i = 0; i < offsets.length - 1; i += 1) {
        var value = parse.getBytes(data, objectOffset + offsets[i], objectOffset + offsets[i + 1]);
        if (conversionFn) {
            value = conversionFn(value);
        }

        objects.push(value);
    }

    return {objects: objects, startOffset: start, endOffset: endOffset};
}

// Parse a `CFF` DICT real value.
function parseFloatOperand(parser) {
    var s = '';
    var eof = 15;
    var lookup = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'E', 'E-', null, '-'];
    while (true) {
        var b = parser.parseByte();
        var n1 = b >> 4;
        var n2 = b & 15;

        if (n1 === eof) {
            break;
        }

        s += lookup[n1];

        if (n2 === eof) {
            break;
        }

        s += lookup[n2];
    }

    return parseFloat(s);
}

// Parse a `CFF` DICT operand.
function parseOperand(parser, b0) {
    var b1;
    var b2;
    var b3;
    var b4;
    if (b0 === 28) {
        b1 = parser.parseByte();
        b2 = parser.parseByte();
        return b1 << 8 | b2;
    }

    if (b0 === 29) {
        b1 = parser.parseByte();
        b2 = parser.parseByte();
        b3 = parser.parseByte();
        b4 = parser.parseByte();
        return b1 << 24 | b2 << 16 | b3 << 8 | b4;
    }

    if (b0 === 30) {
        return parseFloatOperand(parser);
    }

    if (b0 >= 32 && b0 <= 246) {
        return b0 - 139;
    }

    if (b0 >= 247 && b0 <= 250) {
        b1 = parser.parseByte();
        return (b0 - 247) * 256 + b1 + 108;
    }

    if (b0 >= 251 && b0 <= 254) {
        b1 = parser.parseByte();
        return -(b0 - 251) * 256 - b1 - 108;
    }

    throw new Error('Invalid b0 ' + b0);
}

// Convert the entries returned by `parseDict` to a proper dictionary.
// If a value is a list of one, it is unpacked.
function entriesToObject(entries) {
    var o = {};
    for (var i = 0; i < entries.length; i += 1) {
        var key = entries[i][0];
        var values = entries[i][1];
        var value;
        if (values.length === 1) {
            value = values[0];
        } else {
            value = values;
        }

        if (o.hasOwnProperty(key)) {
            throw new Error('Object ' + o + ' already has key ' + key);
        }

        o[key] = value;
    }

    return o;
}

// Parse a `CFF` DICT object.
// A dictionary contains key-value pairs in a compact tokenized format.
function parseCFFDict(data, start, size) {
    start = start !== undefined ? start : 0;
    var parser = new parse.Parser(data, start);
    var entries = [];
    var operands = [];
    size = size !== undefined ? size : data.length;

    while (parser.relativeOffset < size) {
        var op = parser.parseByte();

        // The first byte for each dict item distinguishes between operator (key) and operand (value).
        // Values <= 21 are operators.
        if (op <= 21) {
            // Two-byte operators have an initial escape byte of 12.
            if (op === 12) {
                op = 1200 + parser.parseByte();
            }

            entries.push([op, operands]);
            operands = [];
        } else {
            // Since the operands (values) come before the operators (keys), we store all operands in a list
            // until we encounter an operator.
            operands.push(parseOperand(parser, op));
        }
    }

    return entriesToObject(entries);
}

// Given a String Index (SID), return the value of the string.
// Strings below index 392 are standard CFF strings and are not encoded in the font.
function getCFFString(strings, index) {
    if (index <= 390) {
        index = encoding.cffStandardStrings[index];
    } else {
        index = strings[index - 391];
    }

    return index;
}

// Interpret a dictionary and return a new dictionary with readable keys and values for missing entries.
// This function takes `meta` which is a list of objects containing `operand`, `name` and `default`.
function interpretDict(dict, meta, strings) {
    var newDict = {};

    // Because we also want to include missing values, we start out from the meta list
    // and lookup values in the dict.
    for (var i = 0; i < meta.length; i += 1) {
        var m = meta[i];
        var value = dict[m.op];
        if (value === undefined) {
            value = m.value !== undefined ? m.value : null;
        }

        if (m.type === 'SID') {
            value = getCFFString(strings, value);
        }

        newDict[m.name] = value;
    }

    return newDict;
}

// Parse the CFF header.
function parseCFFHeader(data, start) {
    var header = {};
    header.formatMajor = parse.getCard8(data, start);
    header.formatMinor = parse.getCard8(data, start + 1);
    header.size = parse.getCard8(data, start + 2);
    header.offsetSize = parse.getCard8(data, start + 3);
    header.startOffset = start;
    header.endOffset = start + 4;
    return header;
}

var TOP_DICT_META = [
    {name: 'version', op: 0, type: 'SID'},
    {name: 'notice', op: 1, type: 'SID'},
    {name: 'copyright', op: 1200, type: 'SID'},
    {name: 'fullName', op: 2, type: 'SID'},
    {name: 'familyName', op: 3, type: 'SID'},
    {name: 'weight', op: 4, type: 'SID'},
    {name: 'isFixedPitch', op: 1201, type: 'number', value: 0},
    {name: 'italicAngle', op: 1202, type: 'number', value: 0},
    {name: 'underlinePosition', op: 1203, type: 'number', value: -100},
    {name: 'underlineThickness', op: 1204, type: 'number', value: 50},
    {name: 'paintType', op: 1205, type: 'number', value: 0},
    {name: 'charstringType', op: 1206, type: 'number', value: 2},
    {name: 'fontMatrix', op: 1207, type: ['real', 'real', 'real', 'real', 'real', 'real'], value: [0.001, 0, 0, 0.001, 0, 0]},
    {name: 'uniqueId', op: 13, type: 'number'},
    {name: 'fontBBox', op: 5, type: ['number', 'number', 'number', 'number'], value: [0, 0, 0, 0]},
    {name: 'strokeWidth', op: 1208, type: 'number', value: 0},
    {name: 'xuid', op: 14, type: [], value: null},
    {name: 'charset', op: 15, type: 'offset', value: 0},
    {name: 'encoding', op: 16, type: 'offset', value: 0},
    {name: 'charStrings', op: 17, type: 'offset', value: 0},
    {name: 'private', op: 18, type: ['number', 'offset'], value: [0, 0]}
];

var PRIVATE_DICT_META = [
    {name: 'subrs', op: 19, type: 'offset', value: 0},
    {name: 'defaultWidthX', op: 20, type: 'number', value: 0},
    {name: 'nominalWidthX', op: 21, type: 'number', value: 0}
];

// Parse the CFF top dictionary. A CFF table can contain multiple fonts, each with their own top dictionary.
// The top dictionary contains the essential metadata for the font, together with the private dictionary.
function parseCFFTopDict(data, strings) {
    var dict = parseCFFDict(data, 0, data.byteLength);
    return interpretDict(dict, TOP_DICT_META, strings);
}

// Parse the CFF private dictionary. We don't fully parse out all the values, only the ones we need.
function parseCFFPrivateDict(data, start, size, strings) {
    var dict = parseCFFDict(data, start, size);
    return interpretDict(dict, PRIVATE_DICT_META, strings);
}

// Parse the CFF charset table, which contains internal names for all the glyphs.
// This function will return a list of glyph names.
// See Adobe TN #5176 chapter 13, "Charsets".
function parseCFFCharset(data, start, nGlyphs, strings) {
    var i;
    var sid;
    var count;
    var parser = new parse.Parser(data, start);

    // The .notdef glyph is not included, so subtract 1.
    nGlyphs -= 1;
    var charset = ['.notdef'];

    var format = parser.parseCard8();
    if (format === 0) {
        for (i = 0; i < nGlyphs; i += 1) {
            sid = parser.parseSID();
            charset.push(getCFFString(strings, sid));
        }
    } else if (format === 1) {
        while (charset.length <= nGlyphs) {
            sid = parser.parseSID();
            count = parser.parseCard8();
            for (i = 0; i <= count; i += 1) {
                charset.push(getCFFString(strings, sid));
                sid += 1;
            }
        }
    } else if (format === 2) {
        while (charset.length <= nGlyphs) {
            sid = parser.parseSID();
            count = parser.parseCard16();
            for (i = 0; i <= count; i += 1) {
                charset.push(getCFFString(strings, sid));
                sid += 1;
            }
        }
    } else {
        throw new Error('Unknown charset format ' + format);
    }

    return charset;
}

// Parse the CFF encoding data. Only one encoding can be specified per font.
// See Adobe TN #5176 chapter 12, "Encodings".
function parseCFFEncoding(data, start, charset) {
    var i;
    var code;
    var enc = {};
    var parser = new parse.Parser(data, start);
    var format = parser.parseCard8();
    if (format === 0) {
        var nCodes = parser.parseCard8();
        for (i = 0; i < nCodes; i += 1) {
            code = parser.parseCard8();
            enc[code] = i;
        }
    } else if (format === 1) {
        var nRanges = parser.parseCard8();
        code = 1;
        for (i = 0; i < nRanges; i += 1) {
            var first = parser.parseCard8();
            var nLeft = parser.parseCard8();
            for (var j = first; j <= first + nLeft; j += 1) {
                enc[j] = code;
                code += 1;
            }
        }
    } else {
        throw new Error('Unknown encoding format ' + format);
    }

    return new encoding.CffEncoding(enc, charset);
}

// Take in charstring code and return a Glyph object.
// The encoding is described in the Type 2 Charstring Format
// https://www.microsoft.com/typography/OTSPEC/charstr2.htm
function parseCFFCharstring(font, glyph, code) {
    var c1x;
    var c1y;
    var c2x;
    var c2y;
    var p = new path.Path();
    var stack = [];
    var nStems = 0;
    var haveWidth = false;
    var width = font.defaultWidthX;
    var open = false;
    var x = 0;
    var y = 0;

    function newContour(x, y) {
        if (open) {
            p.closePath();
        }

        p.moveTo(x, y);
        open = true;
    }

    function parseStems() {
        var hasWidthArg;

        // The number of stem operators on the stack is always even.
        // If the value is uneven, that means a width is specified.
        hasWidthArg = stack.length % 2 !== 0;
        if (hasWidthArg && !haveWidth) {
            width = stack.shift() + font.nominalWidthX;
        }

        nStems += stack.length >> 1;
        stack.length = 0;
        haveWidth = true;
    }

    function parse(code) {
        var b1;
        var b2;
        var b3;
        var b4;
        var codeIndex;
        var subrCode;
        var jpx;
        var jpy;
        var c3x;
        var c3y;
        var c4x;
        var c4y;

        var i = 0;
        while (i < code.length) {
            var v = code[i];
            i += 1;
            switch (v) {
            case 1: // hstem
                parseStems();
                break;
            case 3: // vstem
                parseStems();
                break;
            case 4: // vmoveto
                if (stack.length > 1 && !haveWidth) {
                    width = stack.shift() + font.nominalWidthX;
                    haveWidth = true;
                }

                y += stack.pop();
                newContour(x, y);
                break;
            case 5: // rlineto
                while (stack.length > 0) {
                    x += stack.shift();
                    y += stack.shift();
                    p.lineTo(x, y);
                }

                break;
            case 6: // hlineto
                while (stack.length > 0) {
                    x += stack.shift();
                    p.lineTo(x, y);
                    if (stack.length === 0) {
                        break;
                    }

                    y += stack.shift();
                    p.lineTo(x, y);
                }

                break;
            case 7: // vlineto
                while (stack.length > 0) {
                    y += stack.shift();
                    p.lineTo(x, y);
                    if (stack.length === 0) {
                        break;
                    }

                    x += stack.shift();
                    p.lineTo(x, y);
                }

                break;
            case 8: // rrcurveto
                while (stack.length > 0) {
                    c1x = x + stack.shift();
                    c1y = y + stack.shift();
                    c2x = c1x + stack.shift();
                    c2y = c1y + stack.shift();
                    x = c2x + stack.shift();
                    y = c2y + stack.shift();
                    p.curveTo(c1x, c1y, c2x, c2y, x, y);
                }

                break;
            case 10: // callsubr
                codeIndex = stack.pop() + font.subrsBias;
                subrCode = font.subrs[codeIndex];
                if (subrCode) {
                    parse(subrCode);
                }

                break;
            case 11: // return
                return;
            case 12: // flex operators
                v = code[i];
                i += 1;
                switch (v) {
                case 35: // flex
                    // |- dx1 dy1 dx2 dy2 dx3 dy3 dx4 dy4 dx5 dy5 dx6 dy6 fd flex (12 35) |-
                    c1x = x   + stack.shift();    // dx1
                    c1y = y   + stack.shift();    // dy1
                    c2x = c1x + stack.shift();    // dx2
                    c2y = c1y + stack.shift();    // dy2
                    jpx = c2x + stack.shift();    // dx3
                    jpy = c2y + stack.shift();    // dy3
                    c3x = jpx + stack.shift();    // dx4
                    c3y = jpy + stack.shift();    // dy4
                    c4x = c3x + stack.shift();    // dx5
                    c4y = c3y + stack.shift();    // dy5
                    x = c4x + stack.shift();      // dx6
                    y = c4y + stack.shift();      // dy6
                    stack.shift();                // flex depth
                    p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
                    p.curveTo(c3x, c3y, c4x, c4y, x, y);
                    break;
                case 34: // hflex
                    // |- dx1 dx2 dy2 dx3 dx4 dx5 dx6 hflex (12 34) |-
                    c1x = x   + stack.shift();    // dx1
                    c1y = y;                      // dy1
                    c2x = c1x + stack.shift();    // dx2
                    c2y = c1y + stack.shift();    // dy2
                    jpx = c2x + stack.shift();    // dx3
                    jpy = c2y;                    // dy3
                    c3x = jpx + stack.shift();    // dx4
                    c3y = c2y;                    // dy4
                    c4x = c3x + stack.shift();    // dx5
                    c4y = y;                      // dy5
                    x = c4x + stack.shift();      // dx6
                    p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
                    p.curveTo(c3x, c3y, c4x, c4y, x, y);
                    break;
                case 36: // hflex1
                    // |- dx1 dy1 dx2 dy2 dx3 dx4 dx5 dy5 dx6 hflex1 (12 36) |-
                    c1x = x   + stack.shift();    // dx1
                    c1y = y   + stack.shift();    // dy1
                    c2x = c1x + stack.shift();    // dx2
                    c2y = c1y + stack.shift();    // dy2
                    jpx = c2x + stack.shift();    // dx3
                    jpy = c2y;                    // dy3
                    c3x = jpx + stack.shift();    // dx4
                    c3y = c2y;                    // dy4
                    c4x = c3x + stack.shift();    // dx5
                    c4y = c3y + stack.shift();    // dy5
                    x = c4x + stack.shift();      // dx6
                    p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
                    p.curveTo(c3x, c3y, c4x, c4y, x, y);
                    break;
                case 37: // flex1
                    // |- dx1 dy1 dx2 dy2 dx3 dy3 dx4 dy4 dx5 dy5 d6 flex1 (12 37) |-
                    c1x = x   + stack.shift();    // dx1
                    c1y = y   + stack.shift();    // dy1
                    c2x = c1x + stack.shift();    // dx2
                    c2y = c1y + stack.shift();    // dy2
                    jpx = c2x + stack.shift();    // dx3
                    jpy = c2y + stack.shift();    // dy3
                    c3x = jpx + stack.shift();    // dx4
                    c3y = jpy + stack.shift();    // dy4
                    c4x = c3x + stack.shift();    // dx5
                    c4y = c3y + stack.shift();    // dy5
                    if (Math.abs(c4x - x) > Math.abs(c4y - y)) {
                        x = c4x + stack.shift();
                    } else {
                        y = c4y + stack.shift();
                    }

                    p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
                    p.curveTo(c3x, c3y, c4x, c4y, x, y);
                    break;
                default:
                    console.log('Glyph ' + glyph.index + ': unknown operator ' + 1200 + v);
                    stack.length = 0;
                }
                break;
            case 14: // endchar
                if (stack.length > 0 && !haveWidth) {
                    width = stack.shift() + font.nominalWidthX;
                    haveWidth = true;
                }

                if (open) {
                    p.closePath();
                    open = false;
                }

                break;
            case 18: // hstemhm
                parseStems();
                break;
            case 19: // hintmask
            case 20: // cntrmask
                parseStems();
                i += (nStems + 7) >> 3;
                break;
            case 21: // rmoveto
                if (stack.length > 2 && !haveWidth) {
                    width = stack.shift() + font.nominalWidthX;
                    haveWidth = true;
                }

                y += stack.pop();
                x += stack.pop();
                newContour(x, y);
                break;
            case 22: // hmoveto
                if (stack.length > 1 && !haveWidth) {
                    width = stack.shift() + font.nominalWidthX;
                    haveWidth = true;
                }

                x += stack.pop();
                newContour(x, y);
                break;
            case 23: // vstemhm
                parseStems();
                break;
            case 24: // rcurveline
                while (stack.length > 2) {
                    c1x = x + stack.shift();
                    c1y = y + stack.shift();
                    c2x = c1x + stack.shift();
                    c2y = c1y + stack.shift();
                    x = c2x + stack.shift();
                    y = c2y + stack.shift();
                    p.curveTo(c1x, c1y, c2x, c2y, x, y);
                }

                x += stack.shift();
                y += stack.shift();
                p.lineTo(x, y);
                break;
            case 25: // rlinecurve
                while (stack.length > 6) {
                    x += stack.shift();
                    y += stack.shift();
                    p.lineTo(x, y);
                }

                c1x = x + stack.shift();
                c1y = y + stack.shift();
                c2x = c1x + stack.shift();
                c2y = c1y + stack.shift();
                x = c2x + stack.shift();
                y = c2y + stack.shift();
                p.curveTo(c1x, c1y, c2x, c2y, x, y);
                break;
            case 26: // vvcurveto
                if (stack.length % 2) {
                    x += stack.shift();
                }

                while (stack.length > 0) {
                    c1x = x;
                    c1y = y + stack.shift();
                    c2x = c1x + stack.shift();
                    c2y = c1y + stack.shift();
                    x = c2x;
                    y = c2y + stack.shift();
                    p.curveTo(c1x, c1y, c2x, c2y, x, y);
                }

                break;
            case 27: // hhcurveto
                if (stack.length % 2) {
                    y += stack.shift();
                }

                while (stack.length > 0) {
                    c1x = x + stack.shift();
                    c1y = y;
                    c2x = c1x + stack.shift();
                    c2y = c1y + stack.shift();
                    x = c2x + stack.shift();
                    y = c2y;
                    p.curveTo(c1x, c1y, c2x, c2y, x, y);
                }

                break;
            case 28: // shortint
                b1 = code[i];
                b2 = code[i + 1];
                stack.push(((b1 << 24) | (b2 << 16)) >> 16);
                i += 2;
                break;
            case 29: // callgsubr
                codeIndex = stack.pop() + font.gsubrsBias;
                subrCode = font.gsubrs[codeIndex];
                if (subrCode) {
                    parse(subrCode);
                }

                break;
            case 30: // vhcurveto
                while (stack.length > 0) {
                    c1x = x;
                    c1y = y + stack.shift();
                    c2x = c1x + stack.shift();
                    c2y = c1y + stack.shift();
                    x = c2x + stack.shift();
                    y = c2y + (stack.length === 1 ? stack.shift() : 0);
                    p.curveTo(c1x, c1y, c2x, c2y, x, y);
                    if (stack.length === 0) {
                        break;
                    }

                    c1x = x + stack.shift();
                    c1y = y;
                    c2x = c1x + stack.shift();
                    c2y = c1y + stack.shift();
                    y = c2y + stack.shift();
                    x = c2x + (stack.length === 1 ? stack.shift() : 0);
                    p.curveTo(c1x, c1y, c2x, c2y, x, y);
                }

                break;
            case 31: // hvcurveto
                while (stack.length > 0) {
                    c1x = x + stack.shift();
                    c1y = y;
                    c2x = c1x + stack.shift();
                    c2y = c1y + stack.shift();
                    y = c2y + stack.shift();
                    x = c2x + (stack.length === 1 ? stack.shift() : 0);
                    p.curveTo(c1x, c1y, c2x, c2y, x, y);
                    if (stack.length === 0) {
                        break;
                    }

                    c1x = x;
                    c1y = y + stack.shift();
                    c2x = c1x + stack.shift();
                    c2y = c1y + stack.shift();
                    x = c2x + stack.shift();
                    y = c2y + (stack.length === 1 ? stack.shift() : 0);
                    p.curveTo(c1x, c1y, c2x, c2y, x, y);
                }

                break;
            default:
                if (v < 32) {
                    console.log('Glyph ' + glyph.index + ': unknown operator ' + v);
                } else if (v < 247) {
                    stack.push(v - 139);
                } else if (v < 251) {
                    b1 = code[i];
                    i += 1;
                    stack.push((v - 247) * 256 + b1 + 108);
                } else if (v < 255) {
                    b1 = code[i];
                    i += 1;
                    stack.push(-(v - 251) * 256 - b1 - 108);
                } else {
                    b1 = code[i];
                    b2 = code[i + 1];
                    b3 = code[i + 2];
                    b4 = code[i + 3];
                    i += 4;
                    stack.push(((b1 << 24) | (b2 << 16) | (b3 << 8) | b4) / 65536);
                }
            }
        }
    }

    parse(code);

    glyph.advanceWidth = width;
    return p;
}

// Subroutines are encoded using the negative half of the number space.
// See type 2 chapter 4.7 "Subroutine operators".
function calcCFFSubroutineBias(subrs) {
    var bias;
    if (subrs.length < 1240) {
        bias = 107;
    } else if (subrs.length < 33900) {
        bias = 1131;
    } else {
        bias = 32768;
    }

    return bias;
}

// Parse the `CFF` table, which contains the glyph outlines in PostScript format.
function parseCFFTable(data, start, font) {
    font.tables.cff = {};
    var header = parseCFFHeader(data, start);
    var nameIndex = parseCFFIndex(data, header.endOffset, parse.bytesToString);
    var topDictIndex = parseCFFIndex(data, nameIndex.endOffset);
    var stringIndex = parseCFFIndex(data, topDictIndex.endOffset, parse.bytesToString);
    var globalSubrIndex = parseCFFIndex(data, stringIndex.endOffset);
    font.gsubrs = globalSubrIndex.objects;
    font.gsubrsBias = calcCFFSubroutineBias(font.gsubrs);

    var topDictData = new DataView(new Uint8Array(topDictIndex.objects[0]).buffer);
    var topDict = parseCFFTopDict(topDictData, stringIndex.objects);
    font.tables.cff.topDict = topDict;

    var privateDictOffset = start + topDict['private'][1];
    var privateDict = parseCFFPrivateDict(data, privateDictOffset, topDict['private'][0], stringIndex.objects);
    font.defaultWidthX = privateDict.defaultWidthX;
    font.nominalWidthX = privateDict.nominalWidthX;

    if (privateDict.subrs !== 0) {
        var subrOffset = privateDictOffset + privateDict.subrs;
        var subrIndex = parseCFFIndex(data, subrOffset);
        font.subrs = subrIndex.objects;
        font.subrsBias = calcCFFSubroutineBias(font.subrs);
    } else {
        font.subrs = [];
        font.subrsBias = 0;
    }

    // Offsets in the top dict are relative to the beginning of the CFF data, so add the CFF start offset.
    var charStringsIndex = parseCFFIndex(data, start + topDict.charStrings);
    font.nGlyphs = charStringsIndex.objects.length;

    var charset = parseCFFCharset(data, start + topDict.charset, font.nGlyphs, stringIndex.objects);
    if (topDict.encoding === 0) { // Standard encoding
        font.cffEncoding = new encoding.CffEncoding(encoding.cffStandardEncoding, charset);
    } else if (topDict.encoding === 1) { // Expert encoding
        font.cffEncoding = new encoding.CffEncoding(encoding.cffExpertEncoding, charset);
    } else {
        font.cffEncoding = parseCFFEncoding(data, start + topDict.encoding, charset);
    }

    // Prefer the CMAP encoding to the CFF encoding.
    font.encoding = font.encoding || font.cffEncoding;

    font.glyphs = new glyphset.GlyphSet(font);
    for (var i = 0; i < font.nGlyphs; i += 1) {
        var charString = charStringsIndex.objects[i];
        font.glyphs.push(i, glyphset.cffGlyphLoader(font, i, parseCFFCharstring, charString));
    }
}

// Convert a string to a String ID (SID).
// The list of strings is modified in place.
function encodeString(s, strings) {
    var sid;

    // Is the string in the CFF standard strings?
    var i = encoding.cffStandardStrings.indexOf(s);
    if (i >= 0) {
        sid = i;
    }

    // Is the string already in the string index?
    i = strings.indexOf(s);
    if (i >= 0) {
        sid = i + encoding.cffStandardStrings.length;
    } else {
        sid = encoding.cffStandardStrings.length + strings.length;
        strings.push(s);
    }

    return sid;
}

function makeHeader() {
    return new table.Table('Header', [
        {name: 'major', type: 'Card8', value: 1},
        {name: 'minor', type: 'Card8', value: 0},
        {name: 'hdrSize', type: 'Card8', value: 4},
        {name: 'major', type: 'Card8', value: 1}
    ]);
}

function makeNameIndex(fontNames) {
    var t = new table.Table('Name INDEX', [
        {name: 'names', type: 'INDEX', value: []}
    ]);
    t.names = [];
    for (var i = 0; i < fontNames.length; i += 1) {
        t.names.push({name: 'name_' + i, type: 'NAME', value: fontNames[i]});
    }

    return t;
}

// Given a dictionary's metadata, create a DICT structure.
function makeDict(meta, attrs, strings) {
    var m = {};
    for (var i = 0; i < meta.length; i += 1) {
        var entry = meta[i];
        var value = attrs[entry.name];
        if (value !== undefined && !equals(value, entry.value)) {
            if (entry.type === 'SID') {
                value = encodeString(value, strings);
            }

            m[entry.op] = {name: entry.name, type: entry.type, value: value};
        }
    }

    return m;
}

// The Top DICT houses the global font attributes.
function makeTopDict(attrs, strings) {
    var t = new table.Table('Top DICT', [
        {name: 'dict', type: 'DICT', value: {}}
    ]);
    t.dict = makeDict(TOP_DICT_META, attrs, strings);
    return t;
}

function makeTopDictIndex(topDict) {
    var t = new table.Table('Top DICT INDEX', [
        {name: 'topDicts', type: 'INDEX', value: []}
    ]);
    t.topDicts = [{name: 'topDict_0', type: 'TABLE', value: topDict}];
    return t;
}

function makeStringIndex(strings) {
    var t = new table.Table('String INDEX', [
        {name: 'strings', type: 'INDEX', value: []}
    ]);
    t.strings = [];
    for (var i = 0; i < strings.length; i += 1) {
        t.strings.push({name: 'string_' + i, type: 'STRING', value: strings[i]});
    }

    return t;
}

function makeGlobalSubrIndex() {
    // Currently we don't use subroutines.
    return new table.Table('Global Subr INDEX', [
        {name: 'subrs', type: 'INDEX', value: []}
    ]);
}

function makeCharsets(glyphNames, strings) {
    var t = new table.Table('Charsets', [
        {name: 'format', type: 'Card8', value: 0}
    ]);
    for (var i = 0; i < glyphNames.length; i += 1) {
        var glyphName = glyphNames[i];
        var glyphSID = encodeString(glyphName, strings);
        t.fields.push({name: 'glyph_' + i, type: 'SID', value: glyphSID});
    }

    return t;
}

function glyphToOps(glyph) {
    var ops = [];
    var path = glyph.path;
    ops.push({name: 'width', type: 'NUMBER', value: glyph.advanceWidth});
    var x = 0;
    var y = 0;
    for (var i = 0; i < path.commands.length; i += 1) {
        var dx;
        var dy;
        var cmd = path.commands[i];
        if (cmd.type === 'Q') {
            // CFF only supports bézier curves, so convert the quad to a bézier.
            var _13 = 1 / 3;
            var _23 = 2 / 3;

            // We're going to create a new command so we don't change the original path.
            cmd = {
                type: 'C',
                x: cmd.x,
                y: cmd.y,
                x1: _13 * x + _23 * cmd.x1,
                y1: _13 * y + _23 * cmd.y1,
                x2: _13 * cmd.x + _23 * cmd.x1,
                y2: _13 * cmd.y + _23 * cmd.y1
            };
        }

        if (cmd.type === 'M') {
            dx = Math.round(cmd.x - x);
            dy = Math.round(cmd.y - y);
            ops.push({name: 'dx', type: 'NUMBER', value: dx});
            ops.push({name: 'dy', type: 'NUMBER', value: dy});
            ops.push({name: 'rmoveto', type: 'OP', value: 21});
            x = Math.round(cmd.x);
            y = Math.round(cmd.y);
        } else if (cmd.type === 'L') {
            dx = Math.round(cmd.x - x);
            dy = Math.round(cmd.y - y);
            ops.push({name: 'dx', type: 'NUMBER', value: dx});
            ops.push({name: 'dy', type: 'NUMBER', value: dy});
            ops.push({name: 'rlineto', type: 'OP', value: 5});
            x = Math.round(cmd.x);
            y = Math.round(cmd.y);
        } else if (cmd.type === 'C') {
            var dx1 = Math.round(cmd.x1 - x);
            var dy1 = Math.round(cmd.y1 - y);
            var dx2 = Math.round(cmd.x2 - cmd.x1);
            var dy2 = Math.round(cmd.y2 - cmd.y1);
            dx = Math.round(cmd.x - cmd.x2);
            dy = Math.round(cmd.y - cmd.y2);
            ops.push({name: 'dx1', type: 'NUMBER', value: dx1});
            ops.push({name: 'dy1', type: 'NUMBER', value: dy1});
            ops.push({name: 'dx2', type: 'NUMBER', value: dx2});
            ops.push({name: 'dy2', type: 'NUMBER', value: dy2});
            ops.push({name: 'dx', type: 'NUMBER', value: dx});
            ops.push({name: 'dy', type: 'NUMBER', value: dy});
            ops.push({name: 'rrcurveto', type: 'OP', value: 8});
            x = Math.round(cmd.x);
            y = Math.round(cmd.y);
        }

        // Contours are closed automatically.

    }

    ops.push({name: 'endchar', type: 'OP', value: 14});
    return ops;
}

function makeCharStringsIndex(glyphs) {
    var t = new table.Table('CharStrings INDEX', [
        {name: 'charStrings', type: 'INDEX', value: []}
    ]);

    for (var i = 0; i < glyphs.length; i += 1) {
        var glyph = glyphs.get(i);
        var ops = glyphToOps(glyph);
        t.charStrings.push({name: glyph.name, type: 'CHARSTRING', value: ops});
    }

    return t;
}

function makePrivateDict(attrs, strings) {
    var t = new table.Table('Private DICT', [
        {name: 'dict', type: 'DICT', value: {}}
    ]);
    t.dict = makeDict(PRIVATE_DICT_META, attrs, strings);
    return t;
}

function makePrivateDictIndex(privateDict) {
    var t = new table.Table('Private DICT INDEX', [
        {name: 'privateDicts', type: 'INDEX', value: []}
    ]);
    t.privateDicts = [{name: 'privateDict_0', type: 'TABLE', value: privateDict}];
    return t;
}

function makeCFFTable(glyphs, options) {
    var t = new table.Table('CFF ', [
        {name: 'header', type: 'TABLE'},
        {name: 'nameIndex', type: 'TABLE'},
        {name: 'topDictIndex', type: 'TABLE'},
        {name: 'stringIndex', type: 'TABLE'},
        {name: 'globalSubrIndex', type: 'TABLE'},
        {name: 'charsets', type: 'TABLE'},
        {name: 'charStringsIndex', type: 'TABLE'},
        {name: 'privateDictIndex', type: 'TABLE'}
    ]);

    var fontScale = 1 / options.unitsPerEm;
    // We use non-zero values for the offsets so that the DICT encodes them.
    // This is important because the size of the Top DICT plays a role in offset calculation,
    // and the size shouldn't change after we've written correct offsets.
    var attrs = {
        version: options.version,
        fullName: options.fullName,
        familyName: options.familyName,
        weight: options.weightName,
        fontMatrix: [fontScale, 0, 0, fontScale, 0, 0],
        charset: 999,
        encoding: 0,
        charStrings: 999,
        private: [0, 999]
    };

    var privateAttrs = {};

    var glyphNames = [];
    var glyph;

    // Skip first glyph (.notdef)
    for (var i = 1; i < glyphs.length; i += 1) {
        glyph = glyphs.get(i);
        glyphNames.push(glyph.name);
    }

    var strings = [];

    t.header = makeHeader();
    t.nameIndex = makeNameIndex([options.postScriptName]);
    var topDict = makeTopDict(attrs, strings);
    t.topDictIndex = makeTopDictIndex(topDict);
    t.globalSubrIndex = makeGlobalSubrIndex();
    t.charsets = makeCharsets(glyphNames, strings);
    t.charStringsIndex = makeCharStringsIndex(glyphs);
    var privateDict = makePrivateDict(privateAttrs, strings);
    t.privateDictIndex = makePrivateDictIndex(privateDict);

    // Needs to come at the end, to encode all custom strings used in the font.
    t.stringIndex = makeStringIndex(strings);

    var startOffset = t.header.sizeOf() +
        t.nameIndex.sizeOf() +
        t.topDictIndex.sizeOf() +
        t.stringIndex.sizeOf() +
        t.globalSubrIndex.sizeOf();
    attrs.charset = startOffset;

    // We use the CFF standard encoding; proper encoding will be handled in cmap.
    attrs.encoding = 0;
    attrs.charStrings = attrs.charset + t.charsets.sizeOf();
    attrs.private[1] = attrs.charStrings + t.charStringsIndex.sizeOf();

    // Recreate the Top DICT INDEX with the correct offsets.
    topDict = makeTopDict(attrs, strings);
    t.topDictIndex = makeTopDictIndex(topDict);

    return t;
}

exports.parse = parseCFFTable;
exports.make = makeCFFTable;

},{"../encoding":4,"../glyphset":7,"../parse":9,"../path":10,"../table":11}],13:[function(_dereq_,module,exports){
// The `cmap` table stores the mappings from characters to glyphs.
// https://www.microsoft.com/typography/OTSPEC/cmap.htm

'use strict';

var check = _dereq_('../check');
var parse = _dereq_('../parse');
var table = _dereq_('../table');

// Parse the `cmap` table. This table stores the mappings from characters to glyphs.
// There are many available formats, but we only support the Windows format 4.
// This function returns a `CmapEncoding` object or null if no supported format could be found.
function parseCmapTable(data, start) {
    var i;
    var cmap = {};
    cmap.version = parse.getUShort(data, start);
    check.argument(cmap.version === 0, 'cmap table version should be 0.');

    // The cmap table can contain many sub-tables, each with their own format.
    // We're only interested in a "platform 3" table. This is a Windows format.
    cmap.numTables = parse.getUShort(data, start + 2);
    var offset = -1;
    for (i = 0; i < cmap.numTables; i += 1) {
        var platformId = parse.getUShort(data, start + 4 + (i * 8));
        var encodingId = parse.getUShort(data, start + 4 + (i * 8) + 2);
        if (platformId === 3 && (encodingId === 1 || encodingId === 0)) {
            offset = parse.getULong(data, start + 4 + (i * 8) + 4);
            break;
        }
    }

    if (offset === -1) {
        // There is no cmap table in the font that we support, so return null.
        // This font will be marked as unsupported.
        return null;
    }

    var p = new parse.Parser(data, start + offset);
    cmap.format = p.parseUShort();
    check.argument(cmap.format === 4, 'Only format 4 cmap tables are supported.');

    // Length in bytes of the sub-tables.
    cmap.length = p.parseUShort();
    cmap.language = p.parseUShort();

    // segCount is stored x 2.
    var segCount;
    cmap.segCount = segCount = p.parseUShort() >> 1;

    // Skip searchRange, entrySelector, rangeShift.
    p.skip('uShort', 3);

    // The "unrolled" mapping from character codes to glyph indices.
    cmap.glyphIndexMap = {};

    var endCountParser = new parse.Parser(data, start + offset + 14);
    var startCountParser = new parse.Parser(data, start + offset + 16 + segCount * 2);
    var idDeltaParser = new parse.Parser(data, start + offset + 16 + segCount * 4);
    var idRangeOffsetParser = new parse.Parser(data, start + offset + 16 + segCount * 6);
    var glyphIndexOffset = start + offset + 16 + segCount * 8;
    for (i = 0; i < segCount - 1; i += 1) {
        var glyphIndex;
        var endCount = endCountParser.parseUShort();
        var startCount = startCountParser.parseUShort();
        var idDelta = idDeltaParser.parseShort();
        var idRangeOffset = idRangeOffsetParser.parseUShort();
        for (var c = startCount; c <= endCount; c += 1) {
            if (idRangeOffset !== 0) {
                // The idRangeOffset is relative to the current position in the idRangeOffset array.
                // Take the current offset in the idRangeOffset array.
                glyphIndexOffset = (idRangeOffsetParser.offset + idRangeOffsetParser.relativeOffset - 2);

                // Add the value of the idRangeOffset, which will move us into the glyphIndex array.
                glyphIndexOffset += idRangeOffset;

                // Then add the character index of the current segment, multiplied by 2 for USHORTs.
                glyphIndexOffset += (c - startCount) * 2;
                glyphIndex = parse.getUShort(data, glyphIndexOffset);
                if (glyphIndex !== 0) {
                    glyphIndex = (glyphIndex + idDelta) & 0xFFFF;
                }
            } else {
                glyphIndex = (c + idDelta) & 0xFFFF;
            }

            cmap.glyphIndexMap[c] = glyphIndex;
        }
    }

    return cmap;
}

function addSegment(t, code, glyphIndex) {
    t.segments.push({
        end: code,
        start: code,
        delta: -(code - glyphIndex),
        offset: 0
    });
}

function addTerminatorSegment(t) {
    t.segments.push({
        end: 0xFFFF,
        start: 0xFFFF,
        delta: 1,
        offset: 0
    });
}

function makeCmapTable(glyphs) {
    var i;
    var t = new table.Table('cmap', [
        {name: 'version', type: 'USHORT', value: 0},
        {name: 'numTables', type: 'USHORT', value: 1},
        {name: 'platformID', type: 'USHORT', value: 3},
        {name: 'encodingID', type: 'USHORT', value: 1},
        {name: 'offset', type: 'ULONG', value: 12},
        {name: 'format', type: 'USHORT', value: 4},
        {name: 'length', type: 'USHORT', value: 0},
        {name: 'language', type: 'USHORT', value: 0},
        {name: 'segCountX2', type: 'USHORT', value: 0},
        {name: 'searchRange', type: 'USHORT', value: 0},
        {name: 'entrySelector', type: 'USHORT', value: 0},
        {name: 'rangeShift', type: 'USHORT', value: 0}
    ]);

    t.segments = [];
    for (i = 0; i < glyphs.length; i += 1) {
        var glyph = glyphs.get(i);
        for (var j = 0; j < glyph.unicodes.length; j += 1) {
            addSegment(t, glyph.unicodes[j], i);
        }

        t.segments = t.segments.sort(function(a, b) {
            return a.start - b.start;
        });
    }

    addTerminatorSegment(t);

    var segCount;
    segCount = t.segments.length;
    t.segCountX2 = segCount * 2;
    t.searchRange = Math.pow(2, Math.floor(Math.log(segCount) / Math.log(2))) * 2;
    t.entrySelector = Math.log(t.searchRange / 2) / Math.log(2);
    t.rangeShift = t.segCountX2 - t.searchRange;

    // Set up parallel segment arrays.
    var endCounts = [];
    var startCounts = [];
    var idDeltas = [];
    var idRangeOffsets = [];
    var glyphIds = [];

    for (i = 0; i < segCount; i += 1) {
        var segment = t.segments[i];
        endCounts = endCounts.concat({name: 'end_' + i, type: 'USHORT', value: segment.end});
        startCounts = startCounts.concat({name: 'start_' + i, type: 'USHORT', value: segment.start});
        idDeltas = idDeltas.concat({name: 'idDelta_' + i, type: 'SHORT', value: segment.delta});
        idRangeOffsets = idRangeOffsets.concat({name: 'idRangeOffset_' + i, type: 'USHORT', value: segment.offset});
        if (segment.glyphId !== undefined) {
            glyphIds = glyphIds.concat({name: 'glyph_' + i, type: 'USHORT', value: segment.glyphId});
        }
    }

    t.fields = t.fields.concat(endCounts);
    t.fields.push({name: 'reservedPad', type: 'USHORT', value: 0});
    t.fields = t.fields.concat(startCounts);
    t.fields = t.fields.concat(idDeltas);
    t.fields = t.fields.concat(idRangeOffsets);
    t.fields = t.fields.concat(glyphIds);

    t.length = 14 + // Subtable header
        endCounts.length * 2 +
        2 + // reservedPad
        startCounts.length * 2 +
        idDeltas.length * 2 +
        idRangeOffsets.length * 2 +
        glyphIds.length * 2;

    return t;
}

exports.parse = parseCmapTable;
exports.make = makeCmapTable;

},{"../check":2,"../parse":9,"../table":11}],14:[function(_dereq_,module,exports){
// The `glyf` table describes the glyphs in TrueType outline format.
// http://www.microsoft.com/typography/otspec/glyf.htm

'use strict';

var check = _dereq_('../check');
var glyphset = _dereq_('../glyphset');
var parse = _dereq_('../parse');
var path = _dereq_('../path');

// Parse the coordinate data for a glyph.
function parseGlyphCoordinate(p, flag, previousValue, shortVectorBitMask, sameBitMask) {
    var v;
    if ((flag & shortVectorBitMask) > 0) {
        // The coordinate is 1 byte long.
        v = p.parseByte();
        // The `same` bit is re-used for short values to signify the sign of the value.
        if ((flag & sameBitMask) === 0) {
            v = -v;
        }

        v = previousValue + v;
    } else {
        //  The coordinate is 2 bytes long.
        // If the `same` bit is set, the coordinate is the same as the previous coordinate.
        if ((flag & sameBitMask) > 0) {
            v = previousValue;
        } else {
            // Parse the coordinate as a signed 16-bit delta value.
            v = previousValue + p.parseShort();
        }
    }

    return v;
}

// Parse a TrueType glyph.
function parseGlyph(glyph, data, start) {
    var p = new parse.Parser(data, start);
    glyph.numberOfContours = p.parseShort();
    glyph.xMin = p.parseShort();
    glyph.yMin = p.parseShort();
    glyph.xMax = p.parseShort();
    glyph.yMax = p.parseShort();
    var flags;
    var flag;
    if (glyph.numberOfContours > 0) {
        var i;
        // This glyph is not a composite.
        var endPointIndices = glyph.endPointIndices = [];
        for (i = 0; i < glyph.numberOfContours; i += 1) {
            endPointIndices.push(p.parseUShort());
        }

        glyph.instructionLength = p.parseUShort();
        glyph.instructions = [];
        for (i = 0; i < glyph.instructionLength; i += 1) {
            glyph.instructions.push(p.parseByte());
        }

        var numberOfCoordinates = endPointIndices[endPointIndices.length - 1] + 1;
        flags = [];
        for (i = 0; i < numberOfCoordinates; i += 1) {
            flag = p.parseByte();
            flags.push(flag);
            // If bit 3 is set, we repeat this flag n times, where n is the next byte.
            if ((flag & 8) > 0) {
                var repeatCount = p.parseByte();
                for (var j = 0; j < repeatCount; j += 1) {
                    flags.push(flag);
                    i += 1;
                }
            }
        }

        check.argument(flags.length === numberOfCoordinates, 'Bad flags.');

        if (endPointIndices.length > 0) {
            var points = [];
            var point;
            // X/Y coordinates are relative to the previous point, except for the first point which is relative to 0,0.
            if (numberOfCoordinates > 0) {
                for (i = 0; i < numberOfCoordinates; i += 1) {
                    flag = flags[i];
                    point = {};
                    point.onCurve = !!(flag & 1);
                    point.lastPointOfContour = endPointIndices.indexOf(i) >= 0;
                    points.push(point);
                }

                var px = 0;
                for (i = 0; i < numberOfCoordinates; i += 1) {
                    flag = flags[i];
                    point = points[i];
                    point.x = parseGlyphCoordinate(p, flag, px, 2, 16);
                    px = point.x;
                }

                var py = 0;
                for (i = 0; i < numberOfCoordinates; i += 1) {
                    flag = flags[i];
                    point = points[i];
                    point.y = parseGlyphCoordinate(p, flag, py, 4, 32);
                    py = point.y;
                }
            }

            glyph.points = points;
        } else {
            glyph.points = [];
        }
    } else if (glyph.numberOfContours === 0) {
        glyph.points = [];
    } else {
        glyph.isComposite = true;
        glyph.points = [];
        glyph.components = [];
        var moreComponents = true;
        while (moreComponents) {
            flags = p.parseUShort();
            var component = {
                glyphIndex: p.parseUShort(),
                xScale: 1,
                scale01: 0,
                scale10: 0,
                yScale: 1,
                dx: 0,
                dy: 0
            };
            if ((flags & 1) > 0) {
                // The arguments are words
                component.dx = p.parseShort();
                component.dy = p.parseShort();
            } else {
                // The arguments are bytes
                component.dx = p.parseChar();
                component.dy = p.parseChar();
            }

            if ((flags & 8) > 0) {
                // We have a scale
                component.xScale = component.yScale = p.parseF2Dot14();
            } else if ((flags & 64) > 0) {
                // We have an X / Y scale
                component.xScale = p.parseF2Dot14();
                component.yScale = p.parseF2Dot14();
            } else if ((flags & 128) > 0) {
                // We have a 2x2 transformation
                component.xScale = p.parseF2Dot14();
                component.scale01 = p.parseF2Dot14();
                component.scale10 = p.parseF2Dot14();
                component.yScale = p.parseF2Dot14();
            }

            glyph.components.push(component);
            moreComponents = !!(flags & 32);
        }
    }
}

// Transform an array of points and return a new array.
function transformPoints(points, transform) {
    var newPoints = [];
    for (var i = 0; i < points.length; i += 1) {
        var pt = points[i];
        var newPt = {
            x: transform.xScale * pt.x + transform.scale01 * pt.y + transform.dx,
            y: transform.scale10 * pt.x + transform.yScale * pt.y + transform.dy,
            onCurve: pt.onCurve,
            lastPointOfContour: pt.lastPointOfContour
        };
        newPoints.push(newPt);
    }

    return newPoints;
}

function getContours(points) {
    var contours = [];
    var currentContour = [];
    for (var i = 0; i < points.length; i += 1) {
        var pt = points[i];
        currentContour.push(pt);
        if (pt.lastPointOfContour) {
            contours.push(currentContour);
            currentContour = [];
        }
    }

    check.argument(currentContour.length === 0, 'There are still points left in the current contour.');
    return contours;
}

// Convert the TrueType glyph outline to a Path.
function getPath(points) {
    var p = new path.Path();
    if (!points) {
        return p;
    }

    var contours = getContours(points);
    for (var i = 0; i < contours.length; i += 1) {
        var contour = contours[i];
        var firstPt = contour[0];
        var lastPt = contour[contour.length - 1];
        var curvePt;
        var realFirstPoint;
        if (firstPt.onCurve) {
            curvePt = null;
            // The first point will be consumed by the moveTo command,
            // so skip it in the loop.
            realFirstPoint = true;
        } else {
            if (lastPt.onCurve) {
                // If the first point is off-curve and the last point is on-curve,
                // start at the last point.
                firstPt = lastPt;
            } else {
                // If both first and last points are off-curve, start at their middle.
                firstPt = { x: (firstPt.x + lastPt.x) / 2, y: (firstPt.y + lastPt.y) / 2 };
            }

            curvePt = firstPt;
            // The first point is synthesized, so don't skip the real first point.
            realFirstPoint = false;
        }

        p.moveTo(firstPt.x, firstPt.y);

        for (var j = realFirstPoint ? 1 : 0; j < contour.length; j += 1) {
            var pt = contour[j];
            var prevPt = j === 0 ? firstPt : contour[j - 1];
            if (prevPt.onCurve && pt.onCurve) {
                // This is a straight line.
                p.lineTo(pt.x, pt.y);
            } else if (prevPt.onCurve && !pt.onCurve) {
                curvePt = pt;
            } else if (!prevPt.onCurve && !pt.onCurve) {
                var midPt = { x: (prevPt.x + pt.x) / 2, y: (prevPt.y + pt.y) / 2 };
                p.quadraticCurveTo(prevPt.x, prevPt.y, midPt.x, midPt.y);
                curvePt = pt;
            } else if (!prevPt.onCurve && pt.onCurve) {
                // Previous point off-curve, this point on-curve.
                p.quadraticCurveTo(curvePt.x, curvePt.y, pt.x, pt.y);
                curvePt = null;
            } else {
                throw new Error('Invalid state.');
            }
        }

        if (firstPt !== lastPt) {
            // Connect the last and first points
            if (curvePt) {
                p.quadraticCurveTo(curvePt.x, curvePt.y, firstPt.x, firstPt.y);
            } else {
                p.lineTo(firstPt.x, firstPt.y);
            }
        }
    }

    p.closePath();
    return p;
}

function buildPath(glyphs, glyph) {
    if (glyph.isComposite) {
        for (var j = 0; j < glyph.components.length; j += 1) {
            var component = glyph.components[j];
            var componentGlyph = glyphs.get(component.glyphIndex);
            if (componentGlyph.points) {
                var transformedPoints = transformPoints(componentGlyph.points, component);
                glyph.points = glyph.points.concat(transformedPoints);
            }
        }
    }

    return getPath(glyph.points);
}

// Parse all the glyphs according to the offsets from the `loca` table.
function parseGlyfTable(data, start, loca, font) {
    var glyphs = new glyphset.GlyphSet(font);
    var i;

    // The last element of the loca table is invalid.
    for (i = 0; i < loca.length - 1; i += 1) {
        var offset = loca[i];
        var nextOffset = loca[i + 1];
        if (offset !== nextOffset) {
            glyphs.push(i, glyphset.ttfGlyphLoader(font, i, parseGlyph, data, start + offset, buildPath));
        } else {
            glyphs.push(i, glyphset.glyphLoader(font, i));
        }
    }

    return glyphs;
}

exports.parse = parseGlyfTable;

},{"../check":2,"../glyphset":7,"../parse":9,"../path":10}],15:[function(_dereq_,module,exports){
// The `GPOS` table contains kerning pairs, among other things.
// https://www.microsoft.com/typography/OTSPEC/gpos.htm

'use strict';

var check = _dereq_('../check');
var parse = _dereq_('../parse');

// Parse ScriptList and FeatureList tables of GPOS, GSUB, GDEF, BASE, JSTF tables.
// These lists are unused by now, this function is just the basis for a real parsing.
function parseTaggedListTable(data, start) {
    var p = new parse.Parser(data, start);
    var n = p.parseUShort();
    var list = [];
    for (var i = 0; i < n; i++) {
        list[p.parseTag()] = { offset: p.parseUShort() };
    }

    return list;
}

// Parse a coverage table in a GSUB, GPOS or GDEF table.
// Format 1 is a simple list of glyph ids,
// Format 2 is a list of ranges. It is expanded in a list of glyphs, maybe not the best idea.
function parseCoverageTable(data, start) {
    var p = new parse.Parser(data, start);
    var format = p.parseUShort();
    var count =  p.parseUShort();
    if (format === 1) {
        return p.parseUShortList(count);
    }
    else if (format === 2) {
        var coverage = [];
        for (; count--;) {
            var begin = p.parseUShort();
            var end = p.parseUShort();
            var index = p.parseUShort();
            for (var i = begin; i <= end; i++) {
                coverage[index++] = i;
            }
        }

        return coverage;
    }
}

// Parse a Class Definition Table in a GSUB, GPOS or GDEF table.
// Returns a function that gets a class value from a glyph ID.
function parseClassDefTable(data, start) {
    var p = new parse.Parser(data, start);
    var format = p.parseUShort();
    if (format === 1) {
        // Format 1 specifies a range of consecutive glyph indices, one class per glyph ID.
        var startGlyph = p.parseUShort();
        var glyphCount = p.parseUShort();
        var classes = p.parseUShortList(glyphCount);
        return function(glyphID) {
            return classes[glyphID - startGlyph] || 0;
        };
    }
    else if (format === 2) {
        // Format 2 defines multiple groups of glyph indices that belong to the same class.
        var rangeCount = p.parseUShort();
        var startGlyphs = [];
        var endGlyphs = [];
        var classValues = [];
        for (var i = 0; i < rangeCount; i++) {
            startGlyphs[i] = p.parseUShort();
            endGlyphs[i] = p.parseUShort();
            classValues[i] = p.parseUShort();
        }

        return function(glyphID) {
            var l = 0;
            var r = startGlyphs.length - 1;
            while (l < r) {
                var c = (l + r + 1) >> 1;
                if (glyphID < startGlyphs[c]) {
                    r = c - 1;
                } else {
                    l = c;
                }
            }

            if (startGlyphs[l] <= glyphID && glyphID <= endGlyphs[l]) {
                return classValues[l] || 0;
            }

            return 0;
        };
    }
}

// Parse a pair adjustment positioning subtable, format 1 or format 2
// The subtable is returned in the form of a lookup function.
function parsePairPosSubTable(data, start) {
    var p = new parse.Parser(data, start);
    // This part is common to format 1 and format 2 subtables
    var format = p.parseUShort();
    var coverageOffset = p.parseUShort();
    var coverage = parseCoverageTable(data, start + coverageOffset);
    // valueFormat 4: XAdvance only, 1: XPlacement only, 0: no ValueRecord for second glyph
    // Only valueFormat1=4 and valueFormat2=0 is supported.
    var valueFormat1 = p.parseUShort();
    var valueFormat2 = p.parseUShort();
    var value1;
    var value2;
    if (valueFormat1 !== 4 || valueFormat2 !== 0) return;
    var sharedPairSets = {};
    if (format === 1) {
        // Pair Positioning Adjustment: Format 1
        var pairSetCount = p.parseUShort();
        var pairSet = [];
        // Array of offsets to PairSet tables-from beginning of PairPos subtable-ordered by Coverage Index
        var pairSetOffsets = p.parseOffset16List(pairSetCount);
        for (var firstGlyph = 0; firstGlyph < pairSetCount; firstGlyph++) {
            var pairSetOffset = pairSetOffsets[firstGlyph];
            var sharedPairSet = sharedPairSets[pairSetOffset];
            if (!sharedPairSet) {
                // Parse a pairset table in a pair adjustment subtable format 1
                sharedPairSet = {};
                p.relativeOffset = pairSetOffset;
                var pairValueCount = p.parseUShort();
                for (; pairValueCount--;) {
                    var secondGlyph = p.parseUShort();
                    if (valueFormat1) value1 = p.parseShort();
                    if (valueFormat2) value2 = p.parseShort();
                    // We only support valueFormat1 = 4 and valueFormat2 = 0,
                    // so value1 is the XAdvance and value2 is empty.
                    sharedPairSet[secondGlyph] = value1;
                }
            }

            pairSet[coverage[firstGlyph]] = sharedPairSet;
        }

        return function(leftGlyph, rightGlyph) {
            var pairs = pairSet[leftGlyph];
            if (pairs) return pairs[rightGlyph];
        };
    }
    else if (format === 2) {
        // Pair Positioning Adjustment: Format 2
        var classDef1Offset = p.parseUShort();
        var classDef2Offset = p.parseUShort();
        var class1Count = p.parseUShort();
        var class2Count = p.parseUShort();
        var getClass1 = parseClassDefTable(data, start + classDef1Offset);
        var getClass2 = parseClassDefTable(data, start + classDef2Offset);

        // Parse kerning values by class pair.
        var kerningMatrix = [];
        for (var i = 0; i < class1Count; i++) {
            var kerningRow = kerningMatrix[i] = [];
            for (var j = 0; j < class2Count; j++) {
                if (valueFormat1) value1 = p.parseShort();
                if (valueFormat2) value2 = p.parseShort();
                // We only support valueFormat1 = 4 and valueFormat2 = 0,
                // so value1 is the XAdvance and value2 is empty.
                kerningRow[j] = value1;
            }
        }

        // Convert coverage list to a hash
        var covered = {};
        for (i = 0; i < coverage.length; i++) covered[coverage[i]] = 1;

        // Get the kerning value for a specific glyph pair.
        return function(leftGlyph, rightGlyph) {
            if (!covered[leftGlyph]) return;
            var class1 = getClass1(leftGlyph);
            var class2 = getClass2(rightGlyph);
            var kerningRow = kerningMatrix[class1];

            if (kerningRow) {
                return kerningRow[class2];
            }
        };
    }
}

// Parse a LookupTable (present in of GPOS, GSUB, GDEF, BASE, JSTF tables).
function parseLookupTable(data, start) {
    var p = new parse.Parser(data, start);
    var lookupType = p.parseUShort();
    var lookupFlag = p.parseUShort();
    var useMarkFilteringSet = lookupFlag & 0x10;
    var subTableCount = p.parseUShort();
    var subTableOffsets = p.parseOffset16List(subTableCount);
    var table = {
        lookupType: lookupType,
        lookupFlag: lookupFlag,
        markFilteringSet: useMarkFilteringSet ? p.parseUShort() : -1
    };
    // LookupType 2, Pair adjustment
    if (lookupType === 2) {
        var subtables = [];
        for (var i = 0; i < subTableCount; i++) {
            subtables.push(parsePairPosSubTable(data, start + subTableOffsets[i]));
        }
        // Return a function which finds the kerning values in the subtables.
        table.getKerningValue = function(leftGlyph, rightGlyph) {
            for (var i = subtables.length; i--;) {
                var value = subtables[i](leftGlyph, rightGlyph);
                if (value !== undefined) return value;
            }

            return 0;
        };
    }

    return table;
}

// Parse the `GPOS` table which contains, among other things, kerning pairs.
// https://www.microsoft.com/typography/OTSPEC/gpos.htm
function parseGposTable(data, start, font) {
    var p = new parse.Parser(data, start);
    var tableVersion = p.parseFixed();
    check.argument(tableVersion === 1, 'Unsupported GPOS table version.');

    // ScriptList and FeatureList - ignored for now
    parseTaggedListTable(data, start + p.parseUShort());
    // 'kern' is the feature we are looking for.
    parseTaggedListTable(data, start + p.parseUShort());

    // LookupList
    var lookupListOffset = p.parseUShort();
    p.relativeOffset = lookupListOffset;
    var lookupCount = p.parseUShort();
    var lookupTableOffsets = p.parseOffset16List(lookupCount);
    var lookupListAbsoluteOffset = start + lookupListOffset;
    for (var i = 0; i < lookupCount; i++) {
        var table = parseLookupTable(data, lookupListAbsoluteOffset + lookupTableOffsets[i]);
        if (table.lookupType === 2 && !font.getGposKerningValue) font.getGposKerningValue = table.getKerningValue;
    }
}

exports.parse = parseGposTable;

},{"../check":2,"../parse":9}],16:[function(_dereq_,module,exports){
// The `head` table contains global information about the font.
// https://www.microsoft.com/typography/OTSPEC/head.htm

'use strict';

var check = _dereq_('../check');
var parse = _dereq_('../parse');
var table = _dereq_('../table');

// Parse the header `head` table
function parseHeadTable(data, start) {
    var head = {};
    var p = new parse.Parser(data, start);
    head.version = p.parseVersion();
    head.fontRevision = Math.round(p.parseFixed() * 1000) / 1000;
    head.checkSumAdjustment = p.parseULong();
    head.magicNumber = p.parseULong();
    check.argument(head.magicNumber === 0x5F0F3CF5, 'Font header has wrong magic number.');
    head.flags = p.parseUShort();
    head.unitsPerEm = p.parseUShort();
    head.created = p.parseLongDateTime();
    head.modified = p.parseLongDateTime();
    head.xMin = p.parseShort();
    head.yMin = p.parseShort();
    head.xMax = p.parseShort();
    head.yMax = p.parseShort();
    head.macStyle = p.parseUShort();
    head.lowestRecPPEM = p.parseUShort();
    head.fontDirectionHint = p.parseShort();
    head.indexToLocFormat = p.parseShort();     // 50
    head.glyphDataFormat = p.parseShort();
    return head;
}

function makeHeadTable(options) {
    return new table.Table('head', [
        {name: 'version', type: 'FIXED', value: 0x00010000},
        {name: 'fontRevision', type: 'FIXED', value: 0x00010000},
        {name: 'checkSumAdjustment', type: 'ULONG', value: 0},
        {name: 'magicNumber', type: 'ULONG', value: 0x5F0F3CF5},
        {name: 'flags', type: 'USHORT', value: 0},
        {name: 'unitsPerEm', type: 'USHORT', value: 1000},
        {name: 'created', type: 'LONGDATETIME', value: 0},
        {name: 'modified', type: 'LONGDATETIME', value: 0},
        {name: 'xMin', type: 'SHORT', value: 0},
        {name: 'yMin', type: 'SHORT', value: 0},
        {name: 'xMax', type: 'SHORT', value: 0},
        {name: 'yMax', type: 'SHORT', value: 0},
        {name: 'macStyle', type: 'USHORT', value: 0},
        {name: 'lowestRecPPEM', type: 'USHORT', value: 0},
        {name: 'fontDirectionHint', type: 'SHORT', value: 2},
        {name: 'indexToLocFormat', type: 'SHORT', value: 0},
        {name: 'glyphDataFormat', type: 'SHORT', value: 0}
    ], options);
}

exports.parse = parseHeadTable;
exports.make = makeHeadTable;

},{"../check":2,"../parse":9,"../table":11}],17:[function(_dereq_,module,exports){
// The `hhea` table contains information for horizontal layout.
// https://www.microsoft.com/typography/OTSPEC/hhea.htm

'use strict';

var parse = _dereq_('../parse');
var table = _dereq_('../table');

// Parse the horizontal header `hhea` table
function parseHheaTable(data, start) {
    var hhea = {};
    var p = new parse.Parser(data, start);
    hhea.version = p.parseVersion();
    hhea.ascender = p.parseShort();
    hhea.descender = p.parseShort();
    hhea.lineGap = p.parseShort();
    hhea.advanceWidthMax = p.parseUShort();
    hhea.minLeftSideBearing = p.parseShort();
    hhea.minRightSideBearing = p.parseShort();
    hhea.xMaxExtent = p.parseShort();
    hhea.caretSlopeRise = p.parseShort();
    hhea.caretSlopeRun = p.parseShort();
    hhea.caretOffset = p.parseShort();
    p.relativeOffset += 8;
    hhea.metricDataFormat = p.parseShort();
    hhea.numberOfHMetrics = p.parseUShort();
    return hhea;
}

function makeHheaTable(options) {
    return new table.Table('hhea', [
        {name: 'version', type: 'FIXED', value: 0x00010000},
        {name: 'ascender', type: 'FWORD', value: 0},
        {name: 'descender', type: 'FWORD', value: 0},
        {name: 'lineGap', type: 'FWORD', value: 0},
        {name: 'advanceWidthMax', type: 'UFWORD', value: 0},
        {name: 'minLeftSideBearing', type: 'FWORD', value: 0},
        {name: 'minRightSideBearing', type: 'FWORD', value: 0},
        {name: 'xMaxExtent', type: 'FWORD', value: 0},
        {name: 'caretSlopeRise', type: 'SHORT', value: 1},
        {name: 'caretSlopeRun', type: 'SHORT', value: 0},
        {name: 'caretOffset', type: 'SHORT', value: 0},
        {name: 'reserved1', type: 'SHORT', value: 0},
        {name: 'reserved2', type: 'SHORT', value: 0},
        {name: 'reserved3', type: 'SHORT', value: 0},
        {name: 'reserved4', type: 'SHORT', value: 0},
        {name: 'metricDataFormat', type: 'SHORT', value: 0},
        {name: 'numberOfHMetrics', type: 'USHORT', value: 0}
    ], options);
}

exports.parse = parseHheaTable;
exports.make = makeHheaTable;

},{"../parse":9,"../table":11}],18:[function(_dereq_,module,exports){
// The `hmtx` table contains the horizontal metrics for all glyphs.
// https://www.microsoft.com/typography/OTSPEC/hmtx.htm

'use strict';

var parse = _dereq_('../parse');
var table = _dereq_('../table');

// Parse the `hmtx` table, which contains the horizontal metrics for all glyphs.
// This function augments the glyph array, adding the advanceWidth and leftSideBearing to each glyph.
function parseHmtxTable(data, start, numMetrics, numGlyphs, glyphs) {
    var advanceWidth;
    var leftSideBearing;
    var p = new parse.Parser(data, start);
    for (var i = 0; i < numGlyphs; i += 1) {
        // If the font is monospaced, only one entry is needed. This last entry applies to all subsequent glyphs.
        if (i < numMetrics) {
            advanceWidth = p.parseUShort();
            leftSideBearing = p.parseShort();
        }

        var glyph = glyphs.get(i);
        glyph.advanceWidth = advanceWidth;
        glyph.leftSideBearing = leftSideBearing;
    }
}

function makeHmtxTable(glyphs) {
    var t = new table.Table('hmtx', []);
    for (var i = 0; i < glyphs.length; i += 1) {
        var glyph = glyphs.get(i);
        var advanceWidth = glyph.advanceWidth || 0;
        var leftSideBearing = glyph.leftSideBearing || 0;
        t.fields.push({name: 'advanceWidth_' + i, type: 'USHORT', value: advanceWidth});
        t.fields.push({name: 'leftSideBearing_' + i, type: 'SHORT', value: leftSideBearing});
    }

    return t;
}

exports.parse = parseHmtxTable;
exports.make = makeHmtxTable;

},{"../parse":9,"../table":11}],19:[function(_dereq_,module,exports){
// The `kern` table contains kerning pairs.
// Note that some fonts use the GPOS OpenType layout table to specify kerning.
// https://www.microsoft.com/typography/OTSPEC/kern.htm

'use strict';

var check = _dereq_('../check');
var parse = _dereq_('../parse');

// Parse the `kern` table which contains kerning pairs.
function parseKernTable(data, start) {
    var pairs = {};
    var p = new parse.Parser(data, start);
    var tableVersion = p.parseUShort();
    check.argument(tableVersion === 0, 'Unsupported kern table version.');
    // Skip nTables.
    p.skip('uShort', 1);
    var subTableVersion = p.parseUShort();
    check.argument(subTableVersion === 0, 'Unsupported kern sub-table version.');
    // Skip subTableLength, subTableCoverage
    p.skip('uShort', 2);
    var nPairs = p.parseUShort();
    // Skip searchRange, entrySelector, rangeShift.
    p.skip('uShort', 3);
    for (var i = 0; i < nPairs; i += 1) {
        var leftIndex = p.parseUShort();
        var rightIndex = p.parseUShort();
        var value = p.parseShort();
        pairs[leftIndex + ',' + rightIndex] = value;
    }

    return pairs;
}

exports.parse = parseKernTable;

},{"../check":2,"../parse":9}],20:[function(_dereq_,module,exports){
// The `loca` table stores the offsets to the locations of the glyphs in the font.
// https://www.microsoft.com/typography/OTSPEC/loca.htm

'use strict';

var parse = _dereq_('../parse');

// Parse the `loca` table. This table stores the offsets to the locations of the glyphs in the font,
// relative to the beginning of the glyphData table.
// The number of glyphs stored in the `loca` table is specified in the `maxp` table (under numGlyphs)
// The loca table has two versions: a short version where offsets are stored as uShorts, and a long
// version where offsets are stored as uLongs. The `head` table specifies which version to use
// (under indexToLocFormat).
function parseLocaTable(data, start, numGlyphs, shortVersion) {
    var p = new parse.Parser(data, start);
    var parseFn = shortVersion ? p.parseUShort : p.parseULong;
    // There is an extra entry after the last index element to compute the length of the last glyph.
    // That's why we use numGlyphs + 1.
    var glyphOffsets = [];
    for (var i = 0; i < numGlyphs + 1; i += 1) {
        var glyphOffset = parseFn.call(p);
        if (shortVersion) {
            // The short table version stores the actual offset divided by 2.
            glyphOffset *= 2;
        }

        glyphOffsets.push(glyphOffset);
    }

    return glyphOffsets;
}

exports.parse = parseLocaTable;

},{"../parse":9}],21:[function(_dereq_,module,exports){
// The `maxp` table establishes the memory requirements for the font.
// We need it just to get the number of glyphs in the font.
// https://www.microsoft.com/typography/OTSPEC/maxp.htm

'use strict';

var parse = _dereq_('../parse');
var table = _dereq_('../table');

// Parse the maximum profile `maxp` table.
function parseMaxpTable(data, start) {
    var maxp = {};
    var p = new parse.Parser(data, start);
    maxp.version = p.parseVersion();
    maxp.numGlyphs = p.parseUShort();
    if (maxp.version === 1.0) {
        maxp.maxPoints = p.parseUShort();
        maxp.maxContours = p.parseUShort();
        maxp.maxCompositePoints = p.parseUShort();
        maxp.maxCompositeContours = p.parseUShort();
        maxp.maxZones = p.parseUShort();
        maxp.maxTwilightPoints = p.parseUShort();
        maxp.maxStorage = p.parseUShort();
        maxp.maxFunctionDefs = p.parseUShort();
        maxp.maxInstructionDefs = p.parseUShort();
        maxp.maxStackElements = p.parseUShort();
        maxp.maxSizeOfInstructions = p.parseUShort();
        maxp.maxComponentElements = p.parseUShort();
        maxp.maxComponentDepth = p.parseUShort();
    }

    return maxp;
}

function makeMaxpTable(numGlyphs) {
    return new table.Table('maxp', [
        {name: 'version', type: 'FIXED', value: 0x00005000},
        {name: 'numGlyphs', type: 'USHORT', value: numGlyphs}
    ]);
}

exports.parse = parseMaxpTable;
exports.make = makeMaxpTable;

},{"../parse":9,"../table":11}],22:[function(_dereq_,module,exports){
// The `name` naming table.
// https://www.microsoft.com/typography/OTSPEC/name.htm

'use strict';

var encode = _dereq_('../types').encode;
var parse = _dereq_('../parse');
var table = _dereq_('../table');

// NameIDs for the name table.
var nameTableNames = [
    'copyright',              // 0
    'fontFamily',             // 1
    'fontSubfamily',          // 2
    'uniqueID',               // 3
    'fullName',               // 4
    'version',                // 5
    'postScriptName',         // 6
    'trademark',              // 7
    'manufacturer',           // 8
    'designer',               // 9
    'description',            // 10
    'manufacturerURL',        // 11
    'designerURL',            // 12
    'licence',                // 13
    'licenceURL',             // 14
    'reserved',               // 15
    'preferredFamily',        // 16
    'preferredSubfamily',     // 17
    'compatibleFullName',     // 18
    'sampleText',             // 19
    'postScriptFindFontName', // 20
    'wwsFamily',              // 21
    'wwsSubfamily'            // 22
];

// Parse the naming `name` table
// Only Windows Unicode English names are supported.
// Format 1 additional fields are not supported
function parseNameTable(data, start) {
    var name = {};
    var p = new parse.Parser(data, start);
    name.format = p.parseUShort();
    var count = p.parseUShort();
    var stringOffset = p.offset + p.parseUShort();
    var unknownCount = 0;
    for (var i = 0; i < count; i++) {
        var platformID = p.parseUShort();
        var encodingID = p.parseUShort();
        var languageID = p.parseUShort();
        var nameID = p.parseUShort();
        var property = nameTableNames[nameID];
        var byteLength = p.parseUShort();
        var offset = p.parseUShort();
        // platformID - encodingID - languageID standard combinations :
        // 1 - 0 - 0 : Macintosh, Roman, English
        // 3 - 1 - 0x409 : Windows, Unicode BMP (UCS-2), en-US
        if (platformID === 3 && encodingID === 1 && languageID === 0x409) {
            var codePoints = [];
            var length = byteLength / 2;
            for (var j = 0; j < length; j++, offset += 2) {
                codePoints[j] = parse.getShort(data, stringOffset + offset);
            }

            var str = String.fromCharCode.apply(null, codePoints);
            if (property) {
                name[property] = str;
            }
            else {
                unknownCount++;
                name['unknown' + unknownCount] = str;
            }
        }

    }

    if (name.format === 1) {
        name.langTagCount = p.parseUShort();
    }

    return name;
}

function makeNameRecord(platformID, encodingID, languageID, nameID, length, offset) {
    return new table.Table('NameRecord', [
        {name: 'platformID', type: 'USHORT', value: platformID},
        {name: 'encodingID', type: 'USHORT', value: encodingID},
        {name: 'languageID', type: 'USHORT', value: languageID},
        {name: 'nameID', type: 'USHORT', value: nameID},
        {name: 'length', type: 'USHORT', value: length},
        {name: 'offset', type: 'USHORT', value: offset}
    ]);
}

function addMacintoshNameRecord(t, recordID, s, offset) {
    // Macintosh, Roman, English
    var stringBytes = encode.STRING(s);
    t.records.push(makeNameRecord(1, 0, 0, recordID, stringBytes.length, offset));
    t.strings.push(stringBytes);
    offset += stringBytes.length;
    return offset;
}

function addWindowsNameRecord(t, recordID, s, offset) {
    // Windows, Unicode BMP (UCS-2), US English
    var utf16Bytes = encode.UTF16(s);
    t.records.push(makeNameRecord(3, 1, 0x0409, recordID, utf16Bytes.length, offset));
    t.strings.push(utf16Bytes);
    offset += utf16Bytes.length;
    return offset;
}

function makeNameTable(options) {
    var t = new table.Table('name', [
        {name: 'format', type: 'USHORT', value: 0},
        {name: 'count', type: 'USHORT', value: 0},
        {name: 'stringOffset', type: 'USHORT', value: 0}
    ]);
    t.records = [];
    t.strings = [];
    var offset = 0;
    var i;
    var s;
    // Add Macintosh records first
    for (i = 0; i < nameTableNames.length; i += 1) {
        if (options[nameTableNames[i]] !== undefined) {
            s = options[nameTableNames[i]];
            offset = addMacintoshNameRecord(t, i, s, offset);
        }
    }
    // Then add Windows records
    for (i = 0; i < nameTableNames.length; i += 1) {
        if (options[nameTableNames[i]] !== undefined) {
            s = options[nameTableNames[i]];
            offset = addWindowsNameRecord(t, i, s, offset);
        }
    }

    t.count = t.records.length;
    t.stringOffset = 6 + t.count * 12;
    for (i = 0; i < t.records.length; i += 1) {
        t.fields.push({name: 'record_' + i, type: 'TABLE', value: t.records[i]});
    }

    for (i = 0; i < t.strings.length; i += 1) {
        t.fields.push({name: 'string_' + i, type: 'LITERAL', value: t.strings[i]});
    }

    return t;
}

exports.parse = parseNameTable;
exports.make = makeNameTable;

},{"../parse":9,"../table":11,"../types":26}],23:[function(_dereq_,module,exports){
// The `OS/2` table contains metrics required in OpenType fonts.
// https://www.microsoft.com/typography/OTSPEC/os2.htm

'use strict';

var parse = _dereq_('../parse');
var table = _dereq_('../table');

var unicodeRanges = [
    {begin: 0x0000, end: 0x007F}, // Basic Latin
    {begin: 0x0080, end: 0x00FF}, // Latin-1 Supplement
    {begin: 0x0100, end: 0x017F}, // Latin Extended-A
    {begin: 0x0180, end: 0x024F}, // Latin Extended-B
    {begin: 0x0250, end: 0x02AF}, // IPA Extensions
    {begin: 0x02B0, end: 0x02FF}, // Spacing Modifier Letters
    {begin: 0x0300, end: 0x036F}, // Combining Diacritical Marks
    {begin: 0x0370, end: 0x03FF}, // Greek and Coptic
    {begin: 0x2C80, end: 0x2CFF}, // Coptic
    {begin: 0x0400, end: 0x04FF}, // Cyrillic
    {begin: 0x0530, end: 0x058F}, // Armenian
    {begin: 0x0590, end: 0x05FF}, // Hebrew
    {begin: 0xA500, end: 0xA63F}, // Vai
    {begin: 0x0600, end: 0x06FF}, // Arabic
    {begin: 0x07C0, end: 0x07FF}, // NKo
    {begin: 0x0900, end: 0x097F}, // Devanagari
    {begin: 0x0980, end: 0x09FF}, // Bengali
    {begin: 0x0A00, end: 0x0A7F}, // Gurmukhi
    {begin: 0x0A80, end: 0x0AFF}, // Gujarati
    {begin: 0x0B00, end: 0x0B7F}, // Oriya
    {begin: 0x0B80, end: 0x0BFF}, // Tamil
    {begin: 0x0C00, end: 0x0C7F}, // Telugu
    {begin: 0x0C80, end: 0x0CFF}, // Kannada
    {begin: 0x0D00, end: 0x0D7F}, // Malayalam
    {begin: 0x0E00, end: 0x0E7F}, // Thai
    {begin: 0x0E80, end: 0x0EFF}, // Lao
    {begin: 0x10A0, end: 0x10FF}, // Georgian
    {begin: 0x1B00, end: 0x1B7F}, // Balinese
    {begin: 0x1100, end: 0x11FF}, // Hangul Jamo
    {begin: 0x1E00, end: 0x1EFF}, // Latin Extended Additional
    {begin: 0x1F00, end: 0x1FFF}, // Greek Extended
    {begin: 0x2000, end: 0x206F}, // General Punctuation
    {begin: 0x2070, end: 0x209F}, // Superscripts And Subscripts
    {begin: 0x20A0, end: 0x20CF}, // Currency Symbol
    {begin: 0x20D0, end: 0x20FF}, // Combining Diacritical Marks For Symbols
    {begin: 0x2100, end: 0x214F}, // Letterlike Symbols
    {begin: 0x2150, end: 0x218F}, // Number Forms
    {begin: 0x2190, end: 0x21FF}, // Arrows
    {begin: 0x2200, end: 0x22FF}, // Mathematical Operators
    {begin: 0x2300, end: 0x23FF}, // Miscellaneous Technical
    {begin: 0x2400, end: 0x243F}, // Control Pictures
    {begin: 0x2440, end: 0x245F}, // Optical Character Recognition
    {begin: 0x2460, end: 0x24FF}, // Enclosed Alphanumerics
    {begin: 0x2500, end: 0x257F}, // Box Drawing
    {begin: 0x2580, end: 0x259F}, // Block Elements
    {begin: 0x25A0, end: 0x25FF}, // Geometric Shapes
    {begin: 0x2600, end: 0x26FF}, // Miscellaneous Symbols
    {begin: 0x2700, end: 0x27BF}, // Dingbats
    {begin: 0x3000, end: 0x303F}, // CJK Symbols And Punctuation
    {begin: 0x3040, end: 0x309F}, // Hiragana
    {begin: 0x30A0, end: 0x30FF}, // Katakana
    {begin: 0x3100, end: 0x312F}, // Bopomofo
    {begin: 0x3130, end: 0x318F}, // Hangul Compatibility Jamo
    {begin: 0xA840, end: 0xA87F}, // Phags-pa
    {begin: 0x3200, end: 0x32FF}, // Enclosed CJK Letters And Months
    {begin: 0x3300, end: 0x33FF}, // CJK Compatibility
    {begin: 0xAC00, end: 0xD7AF}, // Hangul Syllables
    {begin: 0xD800, end: 0xDFFF}, // Non-Plane 0 *
    {begin: 0x10900, end: 0x1091F}, // Phoenicia
    {begin: 0x4E00, end: 0x9FFF}, // CJK Unified Ideographs
    {begin: 0xE000, end: 0xF8FF}, // Private Use Area (plane 0)
    {begin: 0x31C0, end: 0x31EF}, // CJK Strokes
    {begin: 0xFB00, end: 0xFB4F}, // Alphabetic Presentation Forms
    {begin: 0xFB50, end: 0xFDFF}, // Arabic Presentation Forms-A
    {begin: 0xFE20, end: 0xFE2F}, // Combining Half Marks
    {begin: 0xFE10, end: 0xFE1F}, // Vertical Forms
    {begin: 0xFE50, end: 0xFE6F}, // Small Form Variants
    {begin: 0xFE70, end: 0xFEFF}, // Arabic Presentation Forms-B
    {begin: 0xFF00, end: 0xFFEF}, // Halfwidth And Fullwidth Forms
    {begin: 0xFFF0, end: 0xFFFF}, // Specials
    {begin: 0x0F00, end: 0x0FFF}, // Tibetan
    {begin: 0x0700, end: 0x074F}, // Syriac
    {begin: 0x0780, end: 0x07BF}, // Thaana
    {begin: 0x0D80, end: 0x0DFF}, // Sinhala
    {begin: 0x1000, end: 0x109F}, // Myanmar
    {begin: 0x1200, end: 0x137F}, // Ethiopic
    {begin: 0x13A0, end: 0x13FF}, // Cherokee
    {begin: 0x1400, end: 0x167F}, // Unified Canadian Aboriginal Syllabics
    {begin: 0x1680, end: 0x169F}, // Ogham
    {begin: 0x16A0, end: 0x16FF}, // Runic
    {begin: 0x1780, end: 0x17FF}, // Khmer
    {begin: 0x1800, end: 0x18AF}, // Mongolian
    {begin: 0x2800, end: 0x28FF}, // Braille Patterns
    {begin: 0xA000, end: 0xA48F}, // Yi Syllables
    {begin: 0x1700, end: 0x171F}, // Tagalog
    {begin: 0x10300, end: 0x1032F}, // Old Italic
    {begin: 0x10330, end: 0x1034F}, // Gothic
    {begin: 0x10400, end: 0x1044F}, // Deseret
    {begin: 0x1D000, end: 0x1D0FF}, // Byzantine Musical Symbols
    {begin: 0x1D400, end: 0x1D7FF}, // Mathematical Alphanumeric Symbols
    {begin: 0xFF000, end: 0xFFFFD}, // Private Use (plane 15)
    {begin: 0xFE00, end: 0xFE0F}, // Variation Selectors
    {begin: 0xE0000, end: 0xE007F}, // Tags
    {begin: 0x1900, end: 0x194F}, // Limbu
    {begin: 0x1950, end: 0x197F}, // Tai Le
    {begin: 0x1980, end: 0x19DF}, // New Tai Lue
    {begin: 0x1A00, end: 0x1A1F}, // Buginese
    {begin: 0x2C00, end: 0x2C5F}, // Glagolitic
    {begin: 0x2D30, end: 0x2D7F}, // Tifinagh
    {begin: 0x4DC0, end: 0x4DFF}, // Yijing Hexagram Symbols
    {begin: 0xA800, end: 0xA82F}, // Syloti Nagri
    {begin: 0x10000, end: 0x1007F}, // Linear B Syllabary
    {begin: 0x10140, end: 0x1018F}, // Ancient Greek Numbers
    {begin: 0x10380, end: 0x1039F}, // Ugaritic
    {begin: 0x103A0, end: 0x103DF}, // Old Persian
    {begin: 0x10450, end: 0x1047F}, // Shavian
    {begin: 0x10480, end: 0x104AF}, // Osmanya
    {begin: 0x10800, end: 0x1083F}, // Cypriot Syllabary
    {begin: 0x10A00, end: 0x10A5F}, // Kharoshthi
    {begin: 0x1D300, end: 0x1D35F}, // Tai Xuan Jing Symbols
    {begin: 0x12000, end: 0x123FF}, // Cuneiform
    {begin: 0x1D360, end: 0x1D37F}, // Counting Rod Numerals
    {begin: 0x1B80, end: 0x1BBF}, // Sundanese
    {begin: 0x1C00, end: 0x1C4F}, // Lepcha
    {begin: 0x1C50, end: 0x1C7F}, // Ol Chiki
    {begin: 0xA880, end: 0xA8DF}, // Saurashtra
    {begin: 0xA900, end: 0xA92F}, // Kayah Li
    {begin: 0xA930, end: 0xA95F}, // Rejang
    {begin: 0xAA00, end: 0xAA5F}, // Cham
    {begin: 0x10190, end: 0x101CF}, // Ancient Symbols
    {begin: 0x101D0, end: 0x101FF}, // Phaistos Disc
    {begin: 0x102A0, end: 0x102DF}, // Carian
    {begin: 0x1F030, end: 0x1F09F}  // Domino Tiles
];

function getUnicodeRange(unicode) {
    for (var i = 0; i < unicodeRanges.length; i += 1) {
        var range = unicodeRanges[i];
        if (unicode >= range.begin && unicode < range.end) {
            return i;
        }
    }

    return -1;
}

// Parse the OS/2 and Windows metrics `OS/2` table
function parseOS2Table(data, start) {
    var os2 = {};
    var p = new parse.Parser(data, start);
    os2.version = p.parseUShort();
    os2.xAvgCharWidth = p.parseShort();
    os2.usWeightClass = p.parseUShort();
    os2.usWidthClass = p.parseUShort();
    os2.fsType = p.parseUShort();
    os2.ySubscriptXSize = p.parseShort();
    os2.ySubscriptYSize = p.parseShort();
    os2.ySubscriptXOffset = p.parseShort();
    os2.ySubscriptYOffset = p.parseShort();
    os2.ySuperscriptXSize = p.parseShort();
    os2.ySuperscriptYSize = p.parseShort();
    os2.ySuperscriptXOffset = p.parseShort();
    os2.ySuperscriptYOffset = p.parseShort();
    os2.yStrikeoutSize = p.parseShort();
    os2.yStrikeoutPosition = p.parseShort();
    os2.sFamilyClass = p.parseShort();
    os2.panose = [];
    for (var i = 0; i < 10; i++) {
        os2.panose[i] = p.parseByte();
    }

    os2.ulUnicodeRange1 = p.parseULong();
    os2.ulUnicodeRange2 = p.parseULong();
    os2.ulUnicodeRange3 = p.parseULong();
    os2.ulUnicodeRange4 = p.parseULong();
    os2.achVendID = String.fromCharCode(p.parseByte(), p.parseByte(), p.parseByte(), p.parseByte());
    os2.fsSelection = p.parseUShort();
    os2.usFirstCharIndex = p.parseUShort();
    os2.usLastCharIndex = p.parseUShort();
    os2.sTypoAscender = p.parseShort();
    os2.sTypoDescender = p.parseShort();
    os2.sTypoLineGap = p.parseShort();
    os2.usWinAscent = p.parseUShort();
    os2.usWinDescent = p.parseUShort();
    if (os2.version >= 1) {
        os2.ulCodePageRange1 = p.parseULong();
        os2.ulCodePageRange2 = p.parseULong();
    }

    if (os2.version >= 2) {
        os2.sxHeight = p.parseShort();
        os2.sCapHeight = p.parseShort();
        os2.usDefaultChar = p.parseUShort();
        os2.usBreakChar = p.parseUShort();
        os2.usMaxContent = p.parseUShort();
    }

    return os2;
}

function makeOS2Table(options) {
    return new table.Table('OS/2', [
        {name: 'version', type: 'USHORT', value: 0x0003},
        {name: 'xAvgCharWidth', type: 'SHORT', value: 0},
        {name: 'usWeightClass', type: 'USHORT', value: 0},
        {name: 'usWidthClass', type: 'USHORT', value: 0},
        {name: 'fsType', type: 'USHORT', value: 0},
        {name: 'ySubscriptXSize', type: 'SHORT', value: 650},
        {name: 'ySubscriptYSize', type: 'SHORT', value: 699},
        {name: 'ySubscriptXOffset', type: 'SHORT', value: 0},
        {name: 'ySubscriptYOffset', type: 'SHORT', value: 140},
        {name: 'ySuperscriptXSize', type: 'SHORT', value: 650},
        {name: 'ySuperscriptYSize', type: 'SHORT', value: 699},
        {name: 'ySuperscriptXOffset', type: 'SHORT', value: 0},
        {name: 'ySuperscriptYOffset', type: 'SHORT', value: 479},
        {name: 'yStrikeoutSize', type: 'SHORT', value: 49},
        {name: 'yStrikeoutPosition', type: 'SHORT', value: 258},
        {name: 'sFamilyClass', type: 'SHORT', value: 0},
        {name: 'bFamilyType', type: 'BYTE', value: 0},
        {name: 'bSerifStyle', type: 'BYTE', value: 0},
        {name: 'bWeight', type: 'BYTE', value: 0},
        {name: 'bProportion', type: 'BYTE', value: 0},
        {name: 'bContrast', type: 'BYTE', value: 0},
        {name: 'bStrokeVariation', type: 'BYTE', value: 0},
        {name: 'bArmStyle', type: 'BYTE', value: 0},
        {name: 'bLetterform', type: 'BYTE', value: 0},
        {name: 'bMidline', type: 'BYTE', value: 0},
        {name: 'bXHeight', type: 'BYTE', value: 0},
        {name: 'ulUnicodeRange1', type: 'ULONG', value: 0},
        {name: 'ulUnicodeRange2', type: 'ULONG', value: 0},
        {name: 'ulUnicodeRange3', type: 'ULONG', value: 0},
        {name: 'ulUnicodeRange4', type: 'ULONG', value: 0},
        {name: 'achVendID', type: 'CHARARRAY', value: 'XXXX'},
        {name: 'fsSelection', type: 'USHORT', value: 0},
        {name: 'usFirstCharIndex', type: 'USHORT', value: 0},
        {name: 'usLastCharIndex', type: 'USHORT', value: 0},
        {name: 'sTypoAscender', type: 'SHORT', value: 0},
        {name: 'sTypoDescender', type: 'SHORT', value: 0},
        {name: 'sTypoLineGap', type: 'SHORT', value: 0},
        {name: 'usWinAscent', type: 'USHORT', value: 0},
        {name: 'usWinDescent', type: 'USHORT', value: 0},
        {name: 'ulCodePageRange1', type: 'ULONG', value: 0},
        {name: 'ulCodePageRange2', type: 'ULONG', value: 0},
        {name: 'sxHeight', type: 'SHORT', value: 0},
        {name: 'sCapHeight', type: 'SHORT', value: 0},
        {name: 'usDefaultChar', type: 'USHORT', value: 0},
        {name: 'usBreakChar', type: 'USHORT', value: 0},
        {name: 'usMaxContext', type: 'USHORT', value: 0}
    ], options);
}

exports.unicodeRanges = unicodeRanges;
exports.getUnicodeRange = getUnicodeRange;
exports.parse = parseOS2Table;
exports.make = makeOS2Table;

},{"../parse":9,"../table":11}],24:[function(_dereq_,module,exports){
// The `post` table stores additional PostScript information, such as glyph names.
// https://www.microsoft.com/typography/OTSPEC/post.htm

'use strict';

var encoding = _dereq_('../encoding');
var parse = _dereq_('../parse');
var table = _dereq_('../table');

// Parse the PostScript `post` table
function parsePostTable(data, start) {
    var post = {};
    var p = new parse.Parser(data, start);
    var i;
    post.version = p.parseVersion();
    post.italicAngle = p.parseFixed();
    post.underlinePosition = p.parseShort();
    post.underlineThickness = p.parseShort();
    post.isFixedPitch = p.parseULong();
    post.minMemType42 = p.parseULong();
    post.maxMemType42 = p.parseULong();
    post.minMemType1 = p.parseULong();
    post.maxMemType1 = p.parseULong();
    switch (post.version) {
    case 1:
        post.names = encoding.standardNames.slice();
        break;
    case 2:
        post.numberOfGlyphs = p.parseUShort();
        post.glyphNameIndex = new Array(post.numberOfGlyphs);
        for (i = 0; i < post.numberOfGlyphs; i++) {
            post.glyphNameIndex[i] = p.parseUShort();
        }

        post.names = [];
        for (i = 0; i < post.numberOfGlyphs; i++) {
            if (post.glyphNameIndex[i] >= encoding.standardNames.length) {
                var nameLength = p.parseChar();
                post.names.push(p.parseString(nameLength));
            }
        }

        break;
    case 2.5:
        post.numberOfGlyphs = p.parseUShort();
        post.offset = new Array(post.numberOfGlyphs);
        for (i = 0; i < post.numberOfGlyphs; i++) {
            post.offset[i] = p.parseChar();
        }

        break;
    }
    return post;
}

function makePostTable() {
    return new table.Table('post', [
        {name: 'version', type: 'FIXED', value: 0x00030000},
        {name: 'italicAngle', type: 'FIXED', value: 0},
        {name: 'underlinePosition', type: 'FWORD', value: 0},
        {name: 'underlineThickness', type: 'FWORD', value: 0},
        {name: 'isFixedPitch', type: 'ULONG', value: 0},
        {name: 'minMemType42', type: 'ULONG', value: 0},
        {name: 'maxMemType42', type: 'ULONG', value: 0},
        {name: 'minMemType1', type: 'ULONG', value: 0},
        {name: 'maxMemType1', type: 'ULONG', value: 0}
    ]);
}

exports.parse = parsePostTable;
exports.make = makePostTable;

},{"../encoding":4,"../parse":9,"../table":11}],25:[function(_dereq_,module,exports){
// The `sfnt` wrapper provides organization for the tables in the font.
// It is the top-level data structure in a font.
// https://www.microsoft.com/typography/OTSPEC/otff.htm
// Recommendations for creating OpenType Fonts:
// http://www.microsoft.com/typography/otspec140/recom.htm

'use strict';

var check = _dereq_('../check');
var table = _dereq_('../table');

var cmap = _dereq_('./cmap');
var cff = _dereq_('./cff');
var head = _dereq_('./head');
var hhea = _dereq_('./hhea');
var hmtx = _dereq_('./hmtx');
var maxp = _dereq_('./maxp');
var _name = _dereq_('./name');
var os2 = _dereq_('./os2');
var post = _dereq_('./post');

function log2(v) {
    return Math.log(v) / Math.log(2) | 0;
}

function computeCheckSum(bytes) {
    while (bytes.length % 4 !== 0) {
        bytes.push(0);
    }

    var sum = 0;
    for (var i = 0; i < bytes.length; i += 4) {
        sum += (bytes[i] << 24) +
            (bytes[i + 1] << 16) +
            (bytes[i + 2] << 8) +
            (bytes[i + 3]);
    }

    sum %= Math.pow(2, 32);
    return sum;
}

function makeTableRecord(tag, checkSum, offset, length) {
    return new table.Table('Table Record', [
        {name: 'tag', type: 'TAG', value: tag !== undefined ? tag : ''},
        {name: 'checkSum', type: 'ULONG', value: checkSum !== undefined ? checkSum : 0},
        {name: 'offset', type: 'ULONG', value: offset !== undefined ? offset : 0},
        {name: 'length', type: 'ULONG', value: length !== undefined ? length : 0}
    ]);
}

function makeSfntTable(tables) {
    var sfnt = new table.Table('sfnt', [
        {name: 'version', type: 'TAG', value: 'OTTO'},
        {name: 'numTables', type: 'USHORT', value: 0},
        {name: 'searchRange', type: 'USHORT', value: 0},
        {name: 'entrySelector', type: 'USHORT', value: 0},
        {name: 'rangeShift', type: 'USHORT', value: 0}
    ]);
    sfnt.tables = tables;
    sfnt.numTables = tables.length;
    var highestPowerOf2 = Math.pow(2, log2(sfnt.numTables));
    sfnt.searchRange = 16 * highestPowerOf2;
    sfnt.entrySelector = log2(highestPowerOf2);
    sfnt.rangeShift = sfnt.numTables * 16 - sfnt.searchRange;

    var recordFields = [];
    var tableFields = [];

    var offset = sfnt.sizeOf() + (makeTableRecord().sizeOf() * sfnt.numTables);
    while (offset % 4 !== 0) {
        offset += 1;
        tableFields.push({name: 'padding', type: 'BYTE', value: 0});
    }

    for (var i = 0; i < tables.length; i += 1) {
        var t = tables[i];
        check.argument(t.tableName.length === 4, 'Table name' + t.tableName + ' is invalid.');
        var tableLength = t.sizeOf();
        var tableRecord = makeTableRecord(t.tableName, computeCheckSum(t.encode()), offset, tableLength);
        recordFields.push({name: tableRecord.tag + ' Table Record', type: 'TABLE', value: tableRecord});
        tableFields.push({name: t.tableName + ' table', type: 'TABLE', value: t});
        offset += tableLength;
        check.argument(!isNaN(offset), 'Something went wrong calculating the offset.');
        while (offset % 4 !== 0) {
            offset += 1;
            tableFields.push({name: 'padding', type: 'BYTE', value: 0});
        }
    }

    // Table records need to be sorted alphabetically.
    recordFields.sort(function(r1, r2) {
        if (r1.value.tag > r2.value.tag) {
            return 1;
        } else {
            return -1;
        }
    });

    sfnt.fields = sfnt.fields.concat(recordFields);
    sfnt.fields = sfnt.fields.concat(tableFields);
    return sfnt;
}

// Get the metrics for a character. If the string has more than one character
// this function returns metrics for the first available character.
// You can provide optional fallback metrics if no characters are available.
function metricsForChar(font, chars, notFoundMetrics) {
    for (var i = 0; i < chars.length; i += 1) {
        var glyphIndex = font.charToGlyphIndex(chars[i]);
        if (glyphIndex > 0) {
            var glyph = font.glyphs.get(glyphIndex);
            return glyph.getMetrics();
        }
    }

    return notFoundMetrics;
}

function average(vs) {
    var sum = 0;
    for (var i = 0; i < vs.length; i += 1) {
        sum += vs[i];
    }

    return sum / vs.length;
}

// Convert the font object to a SFNT data structure.
// This structure contains all the necessary tables and metadata to create a binary OTF file.
function fontToSfntTable(font) {
    var xMins = [];
    var yMins = [];
    var xMaxs = [];
    var yMaxs = [];
    var advanceWidths = [];
    var leftSideBearings = [];
    var rightSideBearings = [];
    var firstCharIndex;
    var lastCharIndex = 0;
    var ulUnicodeRange1 = 0;
    var ulUnicodeRange2 = 0;
    var ulUnicodeRange3 = 0;
    var ulUnicodeRange4 = 0;

    for (var i = 0; i < font.glyphs.length; i += 1) {
        var glyph = font.glyphs.get(i);
        var unicode = glyph.unicode | 0;
        if (firstCharIndex > unicode || firstCharIndex === null) {
            firstCharIndex = unicode;
        }

        if (lastCharIndex < unicode) {
            lastCharIndex = unicode;
        }

        var position = os2.getUnicodeRange(unicode);
        if (position < 32) {
            ulUnicodeRange1 |= 1 << position;
        } else if (position < 64) {
            ulUnicodeRange2 |= 1 << position - 32;
        } else if (position < 96) {
            ulUnicodeRange3 |= 1 << position - 64;
        } else if (position < 123) {
            ulUnicodeRange4 |= 1 << position - 96;
        } else {
            throw new Error('Unicode ranges bits > 123 are reserved for internal usage');
        }
        // Skip non-important characters.
        if (glyph.name === '.notdef') continue;
        var metrics = glyph.getMetrics();
        xMins.push(metrics.xMin);
        yMins.push(metrics.yMin);
        xMaxs.push(metrics.xMax);
        yMaxs.push(metrics.yMax);
        leftSideBearings.push(metrics.leftSideBearing);
        rightSideBearings.push(metrics.rightSideBearing);
        advanceWidths.push(glyph.advanceWidth);
    }

    var globals = {
        xMin: Math.min.apply(null, xMins),
        yMin: Math.min.apply(null, yMins),
        xMax: Math.max.apply(null, xMaxs),
        yMax: Math.max.apply(null, yMaxs),
        advanceWidthMax: Math.max.apply(null, advanceWidths),
        advanceWidthAvg: average(advanceWidths),
        minLeftSideBearing: Math.min.apply(null, leftSideBearings),
        maxLeftSideBearing: Math.max.apply(null, leftSideBearings),
        minRightSideBearing: Math.min.apply(null, rightSideBearings)
    };
    globals.ascender = font.ascender !== undefined ? font.ascender : globals.yMax;
    globals.descender = font.descender !== undefined ? font.descender : globals.yMin;

    var headTable = head.make({
        unitsPerEm: font.unitsPerEm,
        xMin: globals.xMin,
        yMin: globals.yMin,
        xMax: globals.xMax,
        yMax: globals.yMax
    });

    var hheaTable = hhea.make({
        ascender: globals.ascender,
        descender: globals.descender,
        advanceWidthMax: globals.advanceWidthMax,
        minLeftSideBearing: globals.minLeftSideBearing,
        minRightSideBearing: globals.minRightSideBearing,
        xMaxExtent: globals.maxLeftSideBearing + (globals.xMax - globals.xMin),
        numberOfHMetrics: font.glyphs.length
    });

    var maxpTable = maxp.make(font.glyphs.length);

    var os2Table = os2.make({
        xAvgCharWidth: Math.round(globals.advanceWidthAvg),
        usWeightClass: 500, // Medium FIXME Make this configurable
        usWidthClass: 5, // Medium (normal) FIXME Make this configurable
        usFirstCharIndex: firstCharIndex,
        usLastCharIndex: lastCharIndex,
        ulUnicodeRange1: ulUnicodeRange1,
        ulUnicodeRange2: ulUnicodeRange2,
        ulUnicodeRange3: ulUnicodeRange3,
        ulUnicodeRange4: ulUnicodeRange4,
        // See http://typophile.com/node/13081 for more info on vertical metrics.
        // We get metrics for typical characters (such as "x" for xHeight).
        // We provide some fallback characters if characters are unavailable: their
        // ordering was chosen experimentally.
        sTypoAscender: globals.ascender,
        sTypoDescender: globals.descender,
        sTypoLineGap: 0,
        usWinAscent: globals.ascender,
        usWinDescent: -globals.descender,
        sxHeight: metricsForChar(font, 'xyvw', {yMax: 0}).yMax,
        sCapHeight: metricsForChar(font, 'HIKLEFJMNTZBDPRAGOQSUVWXY', globals).yMax,
        usBreakChar: font.hasChar(' ') ? 32 : 0 // Use space as the break character, if available.
    });

    var hmtxTable = hmtx.make(font.glyphs);
    var cmapTable = cmap.make(font.glyphs);

    var fullName = font.familyName + ' ' + font.styleName;
    var postScriptName = font.familyName.replace(/\s/g, '') + '-' + font.styleName;
    var nameTable = _name.make({
        copyright: font.copyright,
        fontFamily: font.familyName,
        fontSubfamily: font.styleName,
        uniqueID: font.manufacturer + ':' + fullName,
        fullName: fullName,
        version: font.version,
        postScriptName: postScriptName,
        trademark: font.trademark,
        manufacturer: font.manufacturer,
        designer: font.designer,
        description: font.description,
        manufacturerURL: font.manufacturerURL,
        designerURL: font.designerURL,
        license: font.license,
        licenseURL: font.licenseURL,
        preferredFamily: font.familyName,
        preferredSubfamily: font.styleName
    });
    var postTable = post.make();
    var cffTable = cff.make(font.glyphs, {
        version: font.version,
        fullName: fullName,
        familyName: font.familyName,
        weightName: font.styleName,
        postScriptName: postScriptName,
        unitsPerEm: font.unitsPerEm
    });
    // Order the tables according to the the OpenType specification 1.4.
    var tables = [headTable, hheaTable, maxpTable, os2Table, nameTable, cmapTable, postTable, cffTable, hmtxTable];

    var sfntTable = makeSfntTable(tables);

    // Compute the font's checkSum and store it in head.checkSumAdjustment.
    var bytes = sfntTable.encode();
    var checkSum = computeCheckSum(bytes);
    var tableFields = sfntTable.fields;
    var checkSumAdjusted = false;
    for (i = 0; i < tableFields.length; i += 1) {
        if (tableFields[i].name === 'head table') {
            tableFields[i].value.checkSumAdjustment = 0xB1B0AFBA - checkSum;
            checkSumAdjusted = true;
            break;
        }
    }

    if (!checkSumAdjusted) {
        throw new Error('Could not find head table with checkSum to adjust.');
    }

    return sfntTable;
}

exports.computeCheckSum = computeCheckSum;
exports.make = makeSfntTable;
exports.fontToTable = fontToSfntTable;

},{"../check":2,"../table":11,"./cff":12,"./cmap":13,"./head":16,"./hhea":17,"./hmtx":18,"./maxp":21,"./name":22,"./os2":23,"./post":24}],26:[function(_dereq_,module,exports){
// Data types used in the OpenType font file.
// All OpenType fonts use Motorola-style byte ordering (Big Endian)

/* global WeakMap */

'use strict';

var check = _dereq_('./check');

var LIMIT16 = 32768; // The limit at which a 16-bit number switches signs == 2^15
var LIMIT32 = 2147483648; // The limit at which a 32-bit number switches signs == 2 ^ 31

var decode = {};
var encode = {};
var sizeOf = {};

// Return a function that always returns the same value.
function constant(v) {
    return function() {
        return v;
    };
}

// OpenType data types //////////////////////////////////////////////////////

// Convert an 8-bit unsigned integer to a list of 1 byte.
encode.BYTE = function(v) {
    check.argument(v >= 0 && v <= 255, 'Byte value should be between 0 and 255.');
    return [v];
};

sizeOf.BYTE = constant(1);

// Convert a 8-bit signed integer to a list of 1 byte.
encode.CHAR = function(v) {
    return [v.charCodeAt(0)];
};

sizeOf.BYTE = constant(1);

// Convert an ASCII string to a list of bytes.
encode.CHARARRAY = function(v) {
    var b = [];
    for (var i = 0; i < v.length; i += 1) {
        b.push(v.charCodeAt(i));
    }

    return b;
};

sizeOf.CHARARRAY = function(v) {
    return v.length;
};

// Convert a 16-bit unsigned integer to a list of 2 bytes.
encode.USHORT = function(v) {
    return [(v >> 8) & 0xFF, v & 0xFF];
};

sizeOf.USHORT = constant(2);

// Convert a 16-bit signed integer to a list of 2 bytes.
encode.SHORT = function(v) {
    // Two's complement
    if (v >= LIMIT16) {
        v = -(2 * LIMIT16 - v);
    }

    return [(v >> 8) & 0xFF, v & 0xFF];
};

sizeOf.SHORT = constant(2);

// Convert a 24-bit unsigned integer to a list of 3 bytes.
encode.UINT24 = function(v) {
    return [(v >> 16) & 0xFF, (v >> 8) & 0xFF, v & 0xFF];
};

sizeOf.UINT24 = constant(3);

// Convert a 32-bit unsigned integer to a list of 4 bytes.
encode.ULONG = function(v) {
    return [(v >> 24) & 0xFF, (v >> 16) & 0xFF, (v >> 8) & 0xFF, v & 0xFF];
};

sizeOf.ULONG = constant(4);

// Convert a 32-bit unsigned integer to a list of 4 bytes.
encode.LONG = function(v) {
    // Two's complement
    if (v >= LIMIT32) {
        v = -(2 * LIMIT32 - v);
    }

    return [(v >> 24) & 0xFF, (v >> 16) & 0xFF, (v >> 8) & 0xFF, v & 0xFF];
};

sizeOf.LONG = constant(4);

encode.FIXED = encode.ULONG;
sizeOf.FIXED = sizeOf.ULONG;

encode.FWORD = encode.SHORT;
sizeOf.FWORD = sizeOf.SHORT;

encode.UFWORD = encode.USHORT;
sizeOf.UFWORD = sizeOf.USHORT;

// FIXME Implement LONGDATETIME
encode.LONGDATETIME = function() {
    return [0, 0, 0, 0, 0, 0, 0, 0];
};

sizeOf.LONGDATETIME = constant(8);

// Convert a 4-char tag to a list of 4 bytes.
encode.TAG = function(v) {
    check.argument(v.length === 4, 'Tag should be exactly 4 ASCII characters.');
    return [v.charCodeAt(0),
            v.charCodeAt(1),
            v.charCodeAt(2),
            v.charCodeAt(3)];
};

sizeOf.TAG = constant(4);

// CFF data types ///////////////////////////////////////////////////////////

encode.Card8 = encode.BYTE;
sizeOf.Card8 = sizeOf.BYTE;

encode.Card16 = encode.USHORT;
sizeOf.Card16 = sizeOf.USHORT;

encode.OffSize = encode.BYTE;
sizeOf.OffSize = sizeOf.BYTE;

encode.SID = encode.USHORT;
sizeOf.SID = sizeOf.USHORT;

// Convert a numeric operand or charstring number to a variable-size list of bytes.
encode.NUMBER = function(v) {
    if (v >= -107 && v <= 107) {
        return [v + 139];
    } else if (v >= 108 && v <= 1131) {
        v = v - 108;
        return [(v >> 8) + 247, v & 0xFF];
    } else if (v >= -1131 && v <= -108) {
        v = -v - 108;
        return [(v >> 8) + 251, v & 0xFF];
    } else if (v >= -32768 && v <= 32767) {
        return encode.NUMBER16(v);
    } else {
        return encode.NUMBER32(v);
    }
};

sizeOf.NUMBER = function(v) {
    return encode.NUMBER(v).length;
};

// Convert a signed number between -32768 and +32767 to a three-byte value.
// This ensures we always use three bytes, but is not the most compact format.
encode.NUMBER16 = function(v) {
    return [28, (v >> 8) & 0xFF, v & 0xFF];
};

sizeOf.NUMBER16 = constant(2);

// Convert a signed number between -(2^31) and +(2^31-1) to a four-byte value.
// This is useful if you want to be sure you always use four bytes,
// at the expense of wasting a few bytes for smaller numbers.
encode.NUMBER32 = function(v) {
    return [29, (v >> 24) & 0xFF, (v >> 16) & 0xFF, (v >> 8) & 0xFF, v & 0xFF];
};

sizeOf.NUMBER32 = constant(4);

encode.REAL = function(v) {
    var value = v.toString();

    // Some numbers use an epsilon to encode the value. (e.g. JavaScript will store 0.0000001 as 1e-7)
    // This code converts it back to a number without the epsilon.
    var m = /\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(value);
    if (m) {
        var epsilon = parseFloat('1e' + ((m[2] ? +m[2] : 0) + m[1].length));
        value = (Math.round(v * epsilon) / epsilon).toString();
    }

    var nibbles = '';
    var i;
    var ii;
    for (i = 0, ii = value.length; i < ii; i += 1) {
        var c = value[i];
        if (c === 'e') {
            nibbles += value[++i] === '-' ? 'c' : 'b';
        } else if (c === '.') {
            nibbles += 'a';
        } else if (c === '-') {
            nibbles += 'e';
        } else {
            nibbles += c;
        }
    }

    nibbles += (nibbles.length & 1) ? 'f' : 'ff';
    var out = [30];
    for (i = 0, ii = nibbles.length; i < ii; i += 2) {
        out.push(parseInt(nibbles.substr(i, 2), 16));
    }

    return out;
};

sizeOf.REAL = function(v) {
    return encode.REAL(v).length;
};

encode.NAME = encode.CHARARRAY;
sizeOf.NAME = sizeOf.CHARARRAY;

encode.STRING = encode.CHARARRAY;
sizeOf.STRING = sizeOf.CHARARRAY;

// Convert a ASCII string to a list of UTF16 bytes.
encode.UTF16 = function(v) {
    var b = [];
    for (var i = 0; i < v.length; i += 1) {
        b.push(0);
        b.push(v.charCodeAt(i));
    }

    return b;
};

sizeOf.UTF16 = function(v) {
    return v.length * 2;
};

// Convert a list of values to a CFF INDEX structure.
// The values should be objects containing name / type / value.
encode.INDEX = function(l) {
    var i;
    //var offset, offsets, offsetEncoder, encodedOffsets, encodedOffset, data,
    //    dataSize, i, v;
    // Because we have to know which data type to use to encode the offsets,
    // we have to go through the values twice: once to encode the data and
    // calculate the offets, then again to encode the offsets using the fitting data type.
    var offset = 1; // First offset is always 1.
    var offsets = [offset];
    var data = [];
    var dataSize = 0;
    for (i = 0; i < l.length; i += 1) {
        var v = encode.OBJECT(l[i]);
        Array.prototype.push.apply(data, v);
        dataSize += v.length;
        offset += v.length;
        offsets.push(offset);
    }

    if (data.length === 0) {
        return [0, 0];
    }

    var encodedOffsets = [];
    var offSize = (1 + Math.floor(Math.log(dataSize) / Math.log(2)) / 8) | 0;
    var offsetEncoder = [undefined, encode.BYTE, encode.USHORT, encode.UINT24, encode.ULONG][offSize];
    for (i = 0; i < offsets.length; i += 1) {
        var encodedOffset = offsetEncoder(offsets[i]);
        Array.prototype.push.apply(encodedOffsets, encodedOffset);
    }

    return Array.prototype.concat(encode.Card16(l.length),
                           encode.OffSize(offSize),
                           encodedOffsets,
                           data);
};

sizeOf.INDEX = function(v) {
    return encode.INDEX(v).length;
};

// Convert an object to a CFF DICT structure.
// The keys should be numeric.
// The values should be objects containing name / type / value.
encode.DICT = function(m) {
    var d = [];
    var keys = Object.keys(m);
    var length = keys.length;

    for (var i = 0; i < length; i += 1) {
        // Object.keys() return string keys, but our keys are always numeric.
        var k = parseInt(keys[i], 0);
        var v = m[k];
        // Value comes before the key.
        d = d.concat(encode.OPERAND(v.value, v.type));
        d = d.concat(encode.OPERATOR(k));
    }

    return d;
};

sizeOf.DICT = function(m) {
    return encode.DICT(m).length;
};

encode.OPERATOR = function(v) {
    if (v < 1200) {
        return [v];
    } else {
        return [12, v - 1200];
    }
};

encode.OPERAND = function(v, type) {
    var d = [];
    if (Array.isArray(type)) {
        for (var i = 0; i < type.length; i += 1) {
            check.argument(v.length === type.length, 'Not enough arguments given for type' + type);
            d = d.concat(encode.OPERAND(v[i], type[i]));
        }
    } else {
        if (type === 'SID') {
            d = d.concat(encode.NUMBER(v));
        } else if (type === 'offset') {
            // We make it easy for ourselves and always encode offsets as
            // 4 bytes. This makes offset calculation for the top dict easier.
            d = d.concat(encode.NUMBER32(v));
        } else if (type === 'number') {
            d = d.concat(encode.NUMBER(v));
        } else if (type === 'real') {
            d = d.concat(encode.REAL(v));
        } else {
            throw new Error('Unknown operand type ' + type);
            // FIXME Add support for booleans
        }
    }

    return d;
};

encode.OP = encode.BYTE;
sizeOf.OP = sizeOf.BYTE;

// memoize charstring encoding using WeakMap if available
var wmm = typeof WeakMap === 'function' && new WeakMap();
// Convert a list of CharString operations to bytes.
encode.CHARSTRING = function(ops) {
    if (wmm && wmm.has(ops)) {
        return wmm.get(ops);
    }

    var d = [];
    var length = ops.length;

    for (var i = 0; i < length; i += 1) {
        var op = ops[i];
        d = d.concat(encode[op.type](op.value));
    }

    if (wmm) {
        wmm.set(ops, d);
    }

    return d;
};

sizeOf.CHARSTRING = function(ops) {
    return encode.CHARSTRING(ops).length;
};

// Utility functions ////////////////////////////////////////////////////////

// Convert an object containing name / type / value to bytes.
encode.OBJECT = function(v) {
    var encodingFunction = encode[v.type];
    check.argument(encodingFunction !== undefined, 'No encoding function for type ' + v.type);
    return encodingFunction(v.value);
};

// Convert a table object to bytes.
// A table contains a list of fields containing the metadata (name, type and default value).
// The table itself has the field values set as attributes.
encode.TABLE = function(table) {
    var d = [];
    var length = table.fields.length;

    for (var i = 0; i < length; i += 1) {
        var field = table.fields[i];
        var encodingFunction = encode[field.type];
        check.argument(encodingFunction !== undefined, 'No encoding function for field type ' + field.type);
        var value = table[field.name];
        if (value === undefined) {
            value = field.value;
        }

        var bytes = encodingFunction(value);
        d = d.concat(bytes);
    }

    return d;
};

// Merge in a list of bytes.
encode.LITERAL = function(v) {
    return v;
};

sizeOf.LITERAL = function(v) {
    return v.length;
};

exports.decode = decode;
exports.encode = encode;
exports.sizeOf = sizeOf;

},{"./check":2}],27:[function(_dereq_,module,exports){
/*!
  * Reqwest! A general purpose XHR connection manager
  * license MIT (c) Dustin Diaz 2014
  * https://github.com/ded/reqwest
  */

!function (name, context, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else context[name] = definition()
}('reqwest', this, function () {

  var win = window
    , doc = document
    , httpsRe = /^http/
    , protocolRe = /(^\w+):\/\//
    , twoHundo = /^(20\d|1223)$/ //http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
    , byTag = 'getElementsByTagName'
    , readyState = 'readyState'
    , contentType = 'Content-Type'
    , requestedWith = 'X-Requested-With'
    , head = doc[byTag]('head')[0]
    , uniqid = 0
    , callbackPrefix = 'reqwest_' + (+new Date())
    , lastValue // data stored by the most recent JSONP callback
    , xmlHttpRequest = 'XMLHttpRequest'
    , xDomainRequest = 'XDomainRequest'
    , noop = function () {}

    , isArray = typeof Array.isArray == 'function'
        ? Array.isArray
        : function (a) {
            return a instanceof Array
          }

    , defaultHeaders = {
          'contentType': 'application/x-www-form-urlencoded'
        , 'requestedWith': xmlHttpRequest
        , 'accept': {
              '*':  'text/javascript, text/html, application/xml, text/xml, */*'
            , 'xml':  'application/xml, text/xml'
            , 'html': 'text/html'
            , 'text': 'text/plain'
            , 'json': 'application/json, text/javascript'
            , 'js':   'application/javascript, text/javascript'
          }
      }

    , xhr = function(o) {
        // is it x-domain
        if (o['crossOrigin'] === true) {
          var xhr = win[xmlHttpRequest] ? new XMLHttpRequest() : null
          if (xhr && 'withCredentials' in xhr) {
            return xhr
          } else if (win[xDomainRequest]) {
            return new XDomainRequest()
          } else {
            throw new Error('Browser does not support cross-origin requests')
          }
        } else if (win[xmlHttpRequest]) {
          return new XMLHttpRequest()
        } else {
          return new ActiveXObject('Microsoft.XMLHTTP')
        }
      }
    , globalSetupOptions = {
        dataFilter: function (data) {
          return data
        }
      }

  function succeed(r) {
    var protocol = protocolRe.exec(r.url);
    protocol = (protocol && protocol[1]) || window.location.protocol;
    return httpsRe.test(protocol) ? twoHundo.test(r.request.status) : !!r.request.response;
  }

  function handleReadyState(r, success, error) {
    return function () {
      // use _aborted to mitigate against IE err c00c023f
      // (can't read props on aborted request objects)
      if (r._aborted) return error(r.request)
      if (r._timedOut) return error(r.request, 'Request is aborted: timeout')
      if (r.request && r.request[readyState] == 4) {
        r.request.onreadystatechange = noop
        if (succeed(r)) success(r.request)
        else
          error(r.request)
      }
    }
  }

  function setHeaders(http, o) {
    var headers = o['headers'] || {}
      , h

    headers['Accept'] = headers['Accept']
      || defaultHeaders['accept'][o['type']]
      || defaultHeaders['accept']['*']

    var isAFormData = typeof FormData === 'function' && (o['data'] instanceof FormData);
    // breaks cross-origin requests with legacy browsers
    if (!o['crossOrigin'] && !headers[requestedWith]) headers[requestedWith] = defaultHeaders['requestedWith']
    if (!headers[contentType] && !isAFormData) headers[contentType] = o['contentType'] || defaultHeaders['contentType']
    for (h in headers)
      headers.hasOwnProperty(h) && 'setRequestHeader' in http && http.setRequestHeader(h, headers[h])
  }

  function setCredentials(http, o) {
    if (typeof o['withCredentials'] !== 'undefined' && typeof http.withCredentials !== 'undefined') {
      http.withCredentials = !!o['withCredentials']
    }
  }

  function generalCallback(data) {
    lastValue = data
  }

  function urlappend (url, s) {
    return url + (/\?/.test(url) ? '&' : '?') + s
  }

  function handleJsonp(o, fn, err, url) {
    var reqId = uniqid++
      , cbkey = o['jsonpCallback'] || 'callback' // the 'callback' key
      , cbval = o['jsonpCallbackName'] || reqwest.getcallbackPrefix(reqId)
      , cbreg = new RegExp('((^|\\?|&)' + cbkey + ')=([^&]+)')
      , match = url.match(cbreg)
      , script = doc.createElement('script')
      , loaded = 0
      , isIE10 = navigator.userAgent.indexOf('MSIE 10.0') !== -1

    if (match) {
      if (match[3] === '?') {
        url = url.replace(cbreg, '$1=' + cbval) // wildcard callback func name
      } else {
        cbval = match[3] // provided callback func name
      }
    } else {
      url = urlappend(url, cbkey + '=' + cbval) // no callback details, add 'em
    }

    win[cbval] = generalCallback

    script.type = 'text/javascript'
    script.src = url
    script.async = true
    if (typeof script.onreadystatechange !== 'undefined' && !isIE10) {
      // need this for IE due to out-of-order onreadystatechange(), binding script
      // execution to an event listener gives us control over when the script
      // is executed. See http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
      script.htmlFor = script.id = '_reqwest_' + reqId
    }

    script.onload = script.onreadystatechange = function () {
      if ((script[readyState] && script[readyState] !== 'complete' && script[readyState] !== 'loaded') || loaded) {
        return false
      }
      script.onload = script.onreadystatechange = null
      script.onclick && script.onclick()
      // Call the user callback with the last value stored and clean up values and scripts.
      fn(lastValue)
      lastValue = undefined
      head.removeChild(script)
      loaded = 1
    }

    // Add the script to the DOM head
    head.appendChild(script)

    // Enable JSONP timeout
    return {
      abort: function () {
        script.onload = script.onreadystatechange = null
        err({}, 'Request is aborted: timeout', {})
        lastValue = undefined
        head.removeChild(script)
        loaded = 1
      }
    }
  }

  function getRequest(fn, err) {
    var o = this.o
      , method = (o['method'] || 'GET').toUpperCase()
      , url = typeof o === 'string' ? o : o['url']
      // convert non-string objects to query-string form unless o['processData'] is false
      , data = (o['processData'] !== false && o['data'] && typeof o['data'] !== 'string')
        ? reqwest.toQueryString(o['data'])
        : (o['data'] || null)
      , http
      , sendWait = false

    // if we're working on a GET request and we have data then we should append
    // query string to end of URL and not post data
    if ((o['type'] == 'jsonp' || method == 'GET') && data) {
      url = urlappend(url, data)
      data = null
    }

    if (o['type'] == 'jsonp') return handleJsonp(o, fn, err, url)

    // get the xhr from the factory if passed
    // if the factory returns null, fall-back to ours
    http = (o.xhr && o.xhr(o)) || xhr(o)

    http.open(method, url, o['async'] === false ? false : true)
    setHeaders(http, o)
    setCredentials(http, o)
    if (win[xDomainRequest] && http instanceof win[xDomainRequest]) {
        http.onload = fn
        http.onerror = err
        // NOTE: see
        // http://social.msdn.microsoft.com/Forums/en-US/iewebdevelopment/thread/30ef3add-767c-4436-b8a9-f1ca19b4812e
        http.onprogress = function() {}
        sendWait = true
    } else {
      http.onreadystatechange = handleReadyState(this, fn, err)
    }
    o['before'] && o['before'](http)
    if (sendWait) {
      setTimeout(function () {
        http.send(data)
      }, 200)
    } else {
      http.send(data)
    }
    return http
  }

  function Reqwest(o, fn) {
    this.o = o
    this.fn = fn

    init.apply(this, arguments)
  }

  function setType(header) {
    // json, javascript, text/plain, text/html, xml
    if (header.match('json')) return 'json'
    if (header.match('javascript')) return 'js'
    if (header.match('text')) return 'html'
    if (header.match('xml')) return 'xml'
  }

  function init(o, fn) {

    this.url = typeof o == 'string' ? o : o['url']
    this.timeout = null

    // whether request has been fulfilled for purpose
    // of tracking the Promises
    this._fulfilled = false
    // success handlers
    this._successHandler = function(){}
    this._fulfillmentHandlers = []
    // error handlers
    this._errorHandlers = []
    // complete (both success and fail) handlers
    this._completeHandlers = []
    this._erred = false
    this._responseArgs = {}

    var self = this

    fn = fn || function () {}

    if (o['timeout']) {
      this.timeout = setTimeout(function () {
        timedOut()
      }, o['timeout'])
    }

    if (o['success']) {
      this._successHandler = function () {
        o['success'].apply(o, arguments)
      }
    }

    if (o['error']) {
      this._errorHandlers.push(function () {
        o['error'].apply(o, arguments)
      })
    }

    if (o['complete']) {
      this._completeHandlers.push(function () {
        o['complete'].apply(o, arguments)
      })
    }

    function complete (resp) {
      o['timeout'] && clearTimeout(self.timeout)
      self.timeout = null
      while (self._completeHandlers.length > 0) {
        self._completeHandlers.shift()(resp)
      }
    }

    function success (resp) {
      var type = o['type'] || resp && setType(resp.getResponseHeader('Content-Type')) // resp can be undefined in IE
      resp = (type !== 'jsonp') ? self.request : resp
      // use global data filter on response text
      var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type)
        , r = filteredResponse
      try {
        resp.responseText = r
      } catch (e) {
        // can't assign this in IE<=8, just ignore
      }
      if (r) {
        switch (type) {
        case 'json':
          try {
            resp = win.JSON ? win.JSON.parse(r) : eval('(' + r + ')')
          } catch (err) {
            return error(resp, 'Could not parse JSON in response', err)
          }
          break
        case 'js':
          resp = eval(r)
          break
        case 'html':
          resp = r
          break
        case 'xml':
          resp = resp.responseXML
              && resp.responseXML.parseError // IE trololo
              && resp.responseXML.parseError.errorCode
              && resp.responseXML.parseError.reason
            ? null
            : resp.responseXML
          break
        }
      }

      self._responseArgs.resp = resp
      self._fulfilled = true
      fn(resp)
      self._successHandler(resp)
      while (self._fulfillmentHandlers.length > 0) {
        resp = self._fulfillmentHandlers.shift()(resp)
      }

      complete(resp)
    }

    function timedOut() {
      self._timedOut = true
      self.request.abort()      
    }

    function error(resp, msg, t) {
      resp = self.request
      self._responseArgs.resp = resp
      self._responseArgs.msg = msg
      self._responseArgs.t = t
      self._erred = true
      while (self._errorHandlers.length > 0) {
        self._errorHandlers.shift()(resp, msg, t)
      }
      complete(resp)
    }

    this.request = getRequest.call(this, success, error)
  }

  Reqwest.prototype = {
    abort: function () {
      this._aborted = true
      this.request.abort()
    }

  , retry: function () {
      init.call(this, this.o, this.fn)
    }

    /**
     * Small deviation from the Promises A CommonJs specification
     * http://wiki.commonjs.org/wiki/Promises/A
     */

    /**
     * `then` will execute upon successful requests
     */
  , then: function (success, fail) {
      success = success || function () {}
      fail = fail || function () {}
      if (this._fulfilled) {
        this._responseArgs.resp = success(this._responseArgs.resp)
      } else if (this._erred) {
        fail(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t)
      } else {
        this._fulfillmentHandlers.push(success)
        this._errorHandlers.push(fail)
      }
      return this
    }

    /**
     * `always` will execute whether the request succeeds or fails
     */
  , always: function (fn) {
      if (this._fulfilled || this._erred) {
        fn(this._responseArgs.resp)
      } else {
        this._completeHandlers.push(fn)
      }
      return this
    }

    /**
     * `fail` will execute when the request fails
     */
  , fail: function (fn) {
      if (this._erred) {
        fn(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t)
      } else {
        this._errorHandlers.push(fn)
      }
      return this
    }
  , 'catch': function (fn) {
      return this.fail(fn)
    }
  }

  function reqwest(o, fn) {
    return new Reqwest(o, fn)
  }

  // normalize newline variants according to spec -> CRLF
  function normalize(s) {
    return s ? s.replace(/\r?\n/g, '\r\n') : ''
  }

  function serial(el, cb) {
    var n = el.name
      , t = el.tagName.toLowerCase()
      , optCb = function (o) {
          // IE gives value="" even where there is no value attribute
          // 'specified' ref: http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-862529273
          if (o && !o['disabled'])
            cb(n, normalize(o['attributes']['value'] && o['attributes']['value']['specified'] ? o['value'] : o['text']))
        }
      , ch, ra, val, i

    // don't serialize elements that are disabled or without a name
    if (el.disabled || !n) return

    switch (t) {
    case 'input':
      if (!/reset|button|image|file/i.test(el.type)) {
        ch = /checkbox/i.test(el.type)
        ra = /radio/i.test(el.type)
        val = el.value
        // WebKit gives us "" instead of "on" if a checkbox has no value, so correct it here
        ;(!(ch || ra) || el.checked) && cb(n, normalize(ch && val === '' ? 'on' : val))
      }
      break
    case 'textarea':
      cb(n, normalize(el.value))
      break
    case 'select':
      if (el.type.toLowerCase() === 'select-one') {
        optCb(el.selectedIndex >= 0 ? el.options[el.selectedIndex] : null)
      } else {
        for (i = 0; el.length && i < el.length; i++) {
          el.options[i].selected && optCb(el.options[i])
        }
      }
      break
    }
  }

  // collect up all form elements found from the passed argument elements all
  // the way down to child elements; pass a '<form>' or form fields.
  // called with 'this'=callback to use for serial() on each element
  function eachFormElement() {
    var cb = this
      , e, i
      , serializeSubtags = function (e, tags) {
          var i, j, fa
          for (i = 0; i < tags.length; i++) {
            fa = e[byTag](tags[i])
            for (j = 0; j < fa.length; j++) serial(fa[j], cb)
          }
        }

    for (i = 0; i < arguments.length; i++) {
      e = arguments[i]
      if (/input|select|textarea/i.test(e.tagName)) serial(e, cb)
      serializeSubtags(e, [ 'input', 'select', 'textarea' ])
    }
  }

  // standard query string style serialization
  function serializeQueryString() {
    return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments))
  }

  // { 'name': 'value', ... } style serialization
  function serializeHash() {
    var hash = {}
    eachFormElement.apply(function (name, value) {
      if (name in hash) {
        hash[name] && !isArray(hash[name]) && (hash[name] = [hash[name]])
        hash[name].push(value)
      } else hash[name] = value
    }, arguments)
    return hash
  }

  // [ { name: 'name', value: 'value' }, ... ] style serialization
  reqwest.serializeArray = function () {
    var arr = []
    eachFormElement.apply(function (name, value) {
      arr.push({name: name, value: value})
    }, arguments)
    return arr
  }

  reqwest.serialize = function () {
    if (arguments.length === 0) return ''
    var opt, fn
      , args = Array.prototype.slice.call(arguments, 0)

    opt = args.pop()
    opt && opt.nodeType && args.push(opt) && (opt = null)
    opt && (opt = opt.type)

    if (opt == 'map') fn = serializeHash
    else if (opt == 'array') fn = reqwest.serializeArray
    else fn = serializeQueryString

    return fn.apply(null, args)
  }

  reqwest.toQueryString = function (o, trad) {
    var prefix, i
      , traditional = trad || false
      , s = []
      , enc = encodeURIComponent
      , add = function (key, value) {
          // If value is a function, invoke it and return its value
          value = ('function' === typeof value) ? value() : (value == null ? '' : value)
          s[s.length] = enc(key) + '=' + enc(value)
        }
    // If an array was passed in, assume that it is an array of form elements.
    if (isArray(o)) {
      for (i = 0; o && i < o.length; i++) add(o[i]['name'], o[i]['value'])
    } else {
      // If traditional, encode the "old" way (the way 1.3.2 or older
      // did it), otherwise encode params recursively.
      for (prefix in o) {
        if (o.hasOwnProperty(prefix)) buildParams(prefix, o[prefix], traditional, add)
      }
    }

    // spaces should be + according to spec
    return s.join('&').replace(/%20/g, '+')
  }

  function buildParams(prefix, obj, traditional, add) {
    var name, i, v
      , rbracket = /\[\]$/

    if (isArray(obj)) {
      // Serialize array item.
      for (i = 0; obj && i < obj.length; i++) {
        v = obj[i]
        if (traditional || rbracket.test(prefix)) {
          // Treat each array item as a scalar.
          add(prefix, v)
        } else {
          buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add)
        }
      }
    } else if (obj && obj.toString() === '[object Object]') {
      // Serialize object item.
      for (name in obj) {
        buildParams(prefix + '[' + name + ']', obj[name], traditional, add)
      }

    } else {
      // Serialize scalar item.
      add(prefix, obj)
    }
  }

  reqwest.getcallbackPrefix = function () {
    return callbackPrefix
  }

  // jQuery and Zepto compatibility, differences can be remapped here so you can call
  // .ajax.compat(options, callback)
  reqwest.compat = function (o, fn) {
    if (o) {
      o['type'] && (o['method'] = o['type']) && delete o['type']
      o['dataType'] && (o['type'] = o['dataType'])
      o['jsonpCallback'] && (o['jsonpCallbackName'] = o['jsonpCallback']) && delete o['jsonpCallback']
      o['jsonp'] && (o['jsonpCallback'] = o['jsonp'])
    }
    return new Reqwest(o, fn)
  }

  reqwest.ajaxSetup = function (options) {
    options = options || {}
    for (var k in options) {
      globalSetupOptions[k] = options[k]
    }
  }

  return reqwest
});

},{}],28:[function(_dereq_,module,exports){
/**
 * @module Shape
 * @submodule 3D Primitives
 * @for p5
 * @requires core
 * @requires p5.Geometry3D
 */

'use strict';

var p5 = _dereq_('../core/core');
_dereq_('./p5.Geometry3D');

/**
 * Draw a plane with given a width and height
 * @method plane
 * @param  {Number} width      width of the plane
 * @param  {Number} height     height of the plane
 * @return {p5}                the p5 object
 * @example
 * <div>
 * <code>
 * //draw a plane with width 200 and height 200
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 * }
 *
 * function draw(){
 *   background(200);
 *   plane(200, 200);
 * }
 * </code>
 * </div>
 */
p5.prototype.plane = function(width, height){

  width = width || 50;
  height = height || 50;

  //details for plane are highly optional
  var detailX = typeof arguments[2] === Number ? arguments[2] : 1;
  var detailY = typeof arguments[3] === Number ? arguments[3] : 1;

  var gId = 'plane|'+width+'|'+height+'|'+detailX+'|'+detailY;

  if(!this._renderer.geometryInHash(gId)){

    var geometry3d = new p5.Geometry3D();

    var createPlane = function(u, v){
      var x = 2 * width * u - width;
      var y = 2 * height * v - height;
      var z = 0;
      return new p5.Vector(x, y, z);
    };

    geometry3d.parametricGeometry(createPlane, detailX, detailY);

    var obj = geometry3d.generateObj();

    this._renderer.initBuffer(gId, obj);

  }

  this._renderer.drawBuffer(gId);

};

/**
 * Draw a sphere with given raduis
 * @method sphere
 * @param  {Number} radius            radius of circle
 * @param  {Number} [detail]          optional: number of segments,
 *                                    the more segments the smoother geometry
 *                                    default is 24
 * @return {p5}                       the p5 object
 * @example
 * <div>
 * <code>
 * // draw a sphere with radius 200
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 * }
 *
 * function draw(){
 *   background(200);
 *   sphere(200);
 * }
 * </code>
 * </div>
 */
p5.prototype.sphere = function(radius, detail){

  radius = radius || 50;

  var detailX = detail || 24;
  var detailY = detail || 16;

  var gId = 'sphere|'+radius+'|'+detailX+'|'+detailY;

  if(!this._renderer.geometryInHash(gId)){

    var geometry3d = new p5.Geometry3D();

    var createSphere = function(u, v){
      var theta = 2 * Math.PI * u;
      var phi = Math.PI * v - Math.PI / 2;
      var x = radius * Math.cos(phi) * Math.sin(theta);
      var y = radius * Math.sin(phi);
      var z = radius * Math.cos(phi) * Math.cos(theta);
      return new p5.Vector(x, y, z);
    };

    geometry3d.parametricGeometry(createSphere, detailX, detailY);

    var obj = geometry3d.generateObj();

    this._renderer.initBuffer(gId, obj);
  }

  this._renderer.drawBuffer(gId);

  return this;
};

/**
 * Draw a cylinder with given radius and height
 * @method  cylinder
 * @param  {Number} radius            radius of the surface
 * @param  {Number} height            height of the cylinder
 * @param  {Number} [detail]          optional: number of segments,
 *                                    the more segments the smoother geometry
 *                                    default is 24
 * @return {p5}                       the p5 object
 * @example
 * <div>
 * <code>
 * //draw a spining sylinder with radius 200 and height 200
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 * }
 *
 * function draw(){
 *   background(200);
 *   rotateX(frameCount * 0.01);
 *   rotateZ(frameCount * 0.01);
 *   cylinder(200, 200);
 * }
 * </code>
 * </div>
 */
p5.prototype.cylinder = function(radius, height, detail){

  radius = radius || 50;
  height = height || 50;

  var detailX = detail || 24;
  var detailY = detail || 16;

  var gId = 'cylinder|'+radius+'|'+height+'|'+detailX+'|'+detailY;

  if(!this._renderer.geometryInHash(gId)){

    var geometry3d = new p5.Geometry3D();

    var createCylinder = function(u, v){
      var theta = 2 * Math.PI * u;
      var x = radius * Math.sin(theta);
      var y = 2 * height * v - height;
      var z = radius * Math.cos(theta);
      return new p5.Vector(x, y, z);
    };

    geometry3d.parametricGeometry(createCylinder, detailX, detailY);
    geometry3d.mergeVertices();

    var createTop = function(u, v){
      var theta = 2 * Math.PI * u;
      var x = radius * Math.sin(-theta);
      var y = height;
      var z = radius * Math.cos(theta);
      if(v === 0){
        return new p5.Vector(0, height, 0);
      }
      else{
        return new p5.Vector(x, y, z);
      }
    };

    geometry3d.parametricGeometry(
      createTop, detailX, 1, geometry3d.vertices.length);

    var createBottom = function(u, v){
      var theta = 2 * Math.PI * u;
      var x = radius * Math.sin(theta);
      var y = -height;
      var z = radius * Math.cos(theta);
      if(v === 0){
        return new p5.Vector(0, -height, 0);
      }else{
        return new p5.Vector(x, y, z);
      }
    };

    geometry3d.parametricGeometry(
      createBottom, detailX, 1, geometry3d.vertices.length);

    var obj = geometry3d.generateObj(true);

    this._renderer.initBuffer(gId, obj);
  }

  this._renderer.drawBuffer(gId);

  return this;
};


/**
 * Draw a cone with given radius and height
 * @method cone
 * @param  {Number} radius            radius of the bottom surface
 * @param  {Number} height            height of the cone
 * @param  {Number} [detail]          optional: number of segments,
 *                                    the more segments the smoother geometry
 *                                    default is 24
 * @return {p5}                       the p5 object
 * @example
 * <div>
 * <code>
 * //draw a spining cone with radius 200 and height 200
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 * }
 *
 * function draw(){
 *   background(200);
 *   rotateX(frameCount * 0.01);
 *   rotateZ(frameCount * 0.01);
 *   cone(200, 200);
 * }
 * </code>
 * </div>
 */
p5.prototype.cone = function(radius, height, detail){

  radius = radius || 50;
  height = height || 50;

  var detailX = detail || 24;
  var detailY = detail || 16;

  var gId = 'cone|'+radius+'|'+height+'|'+detailX+'|'+detailY;

  if(!this._renderer.geometryInHash(gId)){

    var geometry3d = new p5.Geometry3D();

    var createCone = function(u, v){
      var theta = 2 * Math.PI * u;
      var x = radius * (1 - v) * Math.sin(theta);
      var y = 2 * height * v - height;
      var z = radius * (1 - v) * Math.cos(theta);
      return new p5.Vector(x, y, z);
    };

    geometry3d.parametricGeometry(createCone, detailX, detailY);
    geometry3d.mergeVertices();

    var createBottom = function(u, v){
      var theta = 2 * Math.PI * u;
      var x = radius * (1 - v) * Math.sin(-theta);
      var y = -height;
      var z = radius * (1 - v) * Math.cos(theta);
      return new p5.Vector(x, y, z);
    };

    geometry3d.parametricGeometry(
      createBottom, detailX, 1, geometry3d.vertices.length);

    var obj = geometry3d.generateObj(true);

    this._renderer.initBuffer(gId, obj);
  }

  this._renderer.drawBuffer(gId);

  return this;
};


/**
 * Draw a torus with given radius and tube radius
 * @method torus
 * @param  {Number} radius            radius of the whole ring
 * @param  {Number} tubeRadius        radius of the tube
 * @param  {Number} [detail]          optional: number of segments,
 *                                    the more segments the smoother geometry
 *                                    default is 24
 * @return {p5}                       the p5 object
 * @example
 * <div>
 * <code>
 * //draw a spining torus with radius 200 and tube radius 60
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 * }
 *
 * function draw(){
 *   background(200);
 *   rotateX(frameCount * 0.01);
 *   rotateY(frameCount * 0.01);
 *   torus(200, 60);
 * }
 * </code>
 * </div>
 */
p5.prototype.torus = function(radius, tubeRadius, detail){

  radius = radius || 50;
  tubeRadius = tubeRadius || 10;

  var detailX = detail || 24;
  var detailY = detail || 16;

  var gId = 'torus|'+radius+'|'+tubeRadius+'|'+detailX+'|'+detailY;

  if(!this._renderer.geometryInHash(gId)){

    var geometry3d = new p5.Geometry3D();

    var createTorus = function(u, v){
      var theta = 2 * Math.PI * u;
      var phi = 2 * Math.PI * v;
      var x = (radius + tubeRadius * Math.cos(phi)) * Math.cos(theta);
      var y = (radius + tubeRadius * Math.cos(phi)) * Math.sin(theta);
      var z = tubeRadius * Math.sin(phi);
      return new p5.Vector(x, y, z);
    };

    geometry3d.parametricGeometry(createTorus, detailX, detailY);

    var obj = geometry3d.generateObj();

    this._renderer.initBuffer(gId, obj);
  }

  this._renderer.drawBuffer(gId);

  return this;
};

/**
 * Draw a box with given width, height and depth
 * @method  box
 * @param  {Number} width  width of the box
 * @param  {Number} height height of the box
 * @param  {Number} depth  depth of the box
 * @return {p5}            the p5 object
 * @example
 * <div>
 * <code>
 * //draw a spining box with width, height and depth 200
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 * }
 *
 * function draw(){
 *   background(200);
 *   rotateX(frameCount * 0.01);
 *   rotateY(frameCount * 0.01);
 *   box(200, 200, 200);
 * }
 * </code>
 * </div>
 */
p5.prototype.box = function(width, height, depth){

  width = width || 50;
  height = height || width;
  depth = depth || width;

  //details for box are highly optional
  var detailX = typeof arguments[3] === Number ? arguments[3] : 1;
  var detailY = typeof arguments[4] === Number ? arguments[4] : 1;

  var gId = 'cube|'+width+'|'+height+'|'+depth+'|'+detailX+'|'+detailY;

  if(!this._renderer.geometryInHash(gId)){

    var geometry3d = new p5.Geometry3D();

    var createPlane1 = function(u, v){
      var x = 2 * width * u - width;
      var y = 2 * height * v - height;
      var z = depth;
      return new p5.Vector(x, y, z);
    };
    var createPlane2 = function(u, v){
      var x = 2 * width * ( 1 - u ) - width;
      var y = 2 * height * v - height;
      var z = -depth;
      return new p5.Vector(x, y, z);
    };
    var createPlane3 = function(u, v){
      var x = 2 * width * ( 1 - u ) - width;
      var y = height;
      var z = 2 * depth * v - depth;
      return new p5.Vector(x, y, z);
    };
    var createPlane4 = function(u, v){
      var x = 2 * width * u - width;
      var y = -height;
      var z = 2 * depth * v - depth;
      return new p5.Vector(x, y, z);
    };
    var createPlane5 = function(u, v){
      var x = width;
      var y = 2 * height * u - height;
      var z = 2 * depth * v - depth;
      return new p5.Vector(x, y, z);
    };
    var createPlane6 = function(u, v){
      var x = -width;
      var y = 2 * height * ( 1 - u ) - height;
      var z = 2 * depth * v - depth;
      return new p5.Vector(x, y, z);
    };

    geometry3d.parametricGeometry(
      createPlane1, detailX, detailY, geometry3d.vertices.length);
    geometry3d.parametricGeometry(
      createPlane2, detailX, detailY, geometry3d.vertices.length);
    geometry3d.parametricGeometry(
      createPlane3, detailX, detailY, geometry3d.vertices.length);
    geometry3d.parametricGeometry(
      createPlane4, detailX, detailY, geometry3d.vertices.length);
    geometry3d.parametricGeometry(
      createPlane5, detailX, detailY, geometry3d.vertices.length);
    geometry3d.parametricGeometry(
      createPlane6, detailX, detailY, geometry3d.vertices.length);

    var obj = geometry3d.generateObj(true);

    this._renderer.initBuffer(gId, obj);
  }

  this._renderer.drawBuffer(gId);

  return this;

};

module.exports = p5;
},{"../core/core":48,"./p5.Geometry3D":34}],29:[function(_dereq_,module,exports){
/**
 * @module Lights, Camera
 * @submodule Camera
 * @for p5
 * @requires core
 */

'use strict';

var p5 = _dereq_('../core/core');

/**
 * Sets camera position
 * @method camera
 * @param  {Number} x  camera postion value on x axis
 * @param  {Number} y  camera postion value on y axis
 * @param  {Number} z  camera postion value on z axis
 * @return {p5}        the p5 object
 * @example
 * <div>
 * <code>
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 * }
 * function draw(){
 *  //move the camera away from the plane by a sin wave
 *  camera(0, 0, sin(frameCount * 0.01) * 100);
 *  plane(120, 120);
 * }
 * </code>
 * </div>
 */
p5.prototype.camera = function(x, y, z){
  var args = new Array(arguments.length);
  for (var i = 0; i < args.length; ++i) {
    args[i] = arguments[i];
  }
  this._validateParameters(
    'camera',
    args,
    ['Number', 'Number', 'Number']
  );
  //what it manipulates is the model view matrix
  this._renderer.translate(-x, -y, -z);
};

/**
 * Sets perspective camera
 * @method  perspective
 * @param  {Number} fovy   camera frustum vertical field of view,
 *                         from bottom to top of view, in degrees
 * @param  {Number} aspect camera frustum aspect ratio
 * @param  {Number} near   frustum near plane length
 * @param  {Number} far    frustum far plane length
 * @return {p5}            the p5 object
 * @example
 * <div>
 * <code>
 * //drag mouse to toggle the world!
 * //you will see there's a vanish point
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 *   perspective(60 / 180 * PI, width/height, 0.1, 100);
 * }
 * function draw(){
 *  background(200);
 *  orbitControl();
 *  for(var i = -1; i < 2; i++){
 *     for(var j = -2; j < 3; j++){
 *       push();
 *       translate(i*160, 0, j*160);
 *       box(40, 40, 40);
 *       pop();
 *     }
 *   }
 * }
 * </code>
 * </div>
 */
p5.prototype.perspective = function(fovy,aspect,near,far) {
  var args = new Array(arguments.length);
  for (var i = 0; i < args.length; ++i) {
    args[i] = arguments[i];
  }
  this._validateParameters(
    'perspective',
    args,
    ['Number', 'Number', 'Number', 'Number']
  );
  this._renderer.uPMatrix = p5.Matrix.identity();
  this._renderer.uPMatrix.perspective(fovy,aspect,near,far);
  this._renderer._setCamera = true;
};

/**
 * Setup ortho camera
 * @method  ortho
 * @param  {Number} left   camera frustum left plane
 * @param  {Number} right  camera frustum right plane
 * @param  {Number} bottom camera frustum bottom plane
 * @param  {Number} top    camera frustum top plane
 * @param  {Number} near   camera frustum near plane
 * @param  {Number} far    camera frustum far plane
 * @return {p5}            the p5 object
 * @example
 * <div>
 * <code>
 * //drag mouse to toggle the world!
 * //there's no vanish point
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 *   ortho(-width/2, width/2, height/2, -height/2, 0.1, 100);
 * }
 * function draw(){
 *  background(200);
 *  orbitControl();
 *  for(var i = -1; i < 2; i++){
 *     for(var j = -2; j < 3; j++){
 *       push();
 *       translate(i*160, 0, j*160);
 *       box(40, 40, 40);
 *       pop();
 *     }
 *   }
 * }
 * </code>
 * </div>
 */
p5.prototype.ortho = function(left,right,bottom,top,near,far) {
  var args = new Array(arguments.length);
  for (var i = 0; i < args.length; ++i) {
    args[i] = arguments[i];
  }
  this._validateParameters(
    'ortho',
    args,
      ['Number', 'Number', 'Number', 'Number', 'Number', 'Number']
  );
  left /= this.width;
  right /= this.width;
  top /= this.height;
  bottom /= this.height;
  this._renderer.uPMatrix = p5.Matrix.identity();
  this._renderer.uPMatrix.ortho(left,right,bottom,top,near,far);
  this._renderer._setCamera = true;
};

module.exports = p5;

},{"../core/core":48}],30:[function(_dereq_,module,exports){
//@TODO: documentation of immediate mode

'use strict';

var p5 = _dereq_('../core/core');

//////////////////////////////////////////////
// _primitives2D in 3D space
//////////////////////////////////////////////

p5.Renderer3D.prototype._primitives2D = function(arr){
  this._setDefaultCamera();
  var gl = this.GL;
  var shaderProgram = this._getColorVertexShader();

  //create vertice buffer
  var vertexPositionBuffer = this.verticeBuffer;
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);

  gl.bufferData(
    gl.ARRAY_BUFFER, new Float32Array(arr), gl.STATIC_DRAW);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
    3, gl.FLOAT, false, 0, 0);

  //create vertexcolor buffer
  var vertexColorBuffer = this.colorBuffer;
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  var color = this._getCurColor();
  var colors = [];
  for(var i = 0; i < arr.length / 3; i++){
    colors = colors.concat(color);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,
    4, gl.FLOAT, false, 0, 0);

  //matrix
  var mId = 'vertexColorVert|vertexColorFrag';
  this.setMatrixUniforms(mId);
};

p5.Renderer3D.prototype.point = function(x, y, z){
  var gl = this.GL;
  this._primitives2D([x, y, z]);
  gl.drawArrays(gl.POINTS, 0, 1);
  return this;
};

p5.Renderer3D.prototype.line = function(x1, y1, z1, x2, y2, z2){
  var gl = this.GL;
  this._primitives2D([x1, y1, z1, x2, y2, z2]);
  gl.drawArrays(gl.LINES, 0, 2);
  return this;
};

p5.Renderer3D.prototype.triangle = function
(x1, y1, z1, x2, y2, z2, x3, y3, z3){
  var gl = this.GL;
  this._primitives2D([x1, y1, z1, x2, y2, z2, x3, y3, z3]);
  this._strokeCheck();
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  return this;
};

//@TODO: how to define the order of 4 points
p5.Renderer3D.prototype.quad = function
(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4){
  var gl = this.GL;
  this._primitives2D(
    [x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4]);
  this._strokeCheck();
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  return this;
};

p5.Renderer3D.prototype.beginShape = function(mode){
  this.shapeMode = mode;
  this.verticeStack = [];
  return this;
};

p5.Renderer3D.prototype.vertex = function(x, y, z){
  this.verticeStack.push(x, y, z);
  return this;
};

p5.Renderer3D.prototype.endShape = function(){
  var gl = this.GL;
  this._primitives2D(this.verticeStack);
  this.verticeStack = [];

  switch(this.shapeMode){
    case 'POINTS':
      gl.drawArrays(gl.POINTS, 0, 1);
      break;
    case 'LINES':
      gl.drawArrays(gl.LINES, 0, 2);
      break;
    case 'TRIANGLES':
      this._strokeCheck();
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      break;
    case 'TRIANGLE_STRIP':
      this._strokeCheck();
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      break;
    default:
      this._strokeCheck();
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      break;
  }
  return this;
};

//@TODO: figure out how to actually do stroke on shapes in 3D
p5.Renderer3D.prototype._strokeCheck = function(){
  if(this.drawMode === 'stroke'){
    throw new Error(
      'stroke for shapes in 3D not yet implemented, use fill for now :('
    );
  }
};

//@TODO
p5.Renderer3D.prototype.strokeWeight = function() {
  throw new Error('strokeWeight for 3d not yet implemented');
};

//////////////////////////////////////////////
// COLOR
//////////////////////////////////////////////

p5.Renderer3D.prototype.fill = function(r, g, b, a) {
  var color = this._pInst.color.apply(this._pInst, arguments);
  var colorNormalized = color._normalize();
  this.curColor = colorNormalized;
  this.drawMode = 'fill';
  return this;
};

p5.Renderer3D.prototype.stroke = function(r, g, b, a) {
  var color = this._pInst.color.apply(this._pInst, arguments);
  var colorNormalized = color._normalize();
  this.curColor = colorNormalized;
  this.drawMode = 'stroke';
  return this;
};

p5.Renderer3D.prototype._getColorVertexShader = function(){
  var gl = this.GL;
  var mId = 'vertexColorVert|vertexColorFrag';
  var shaderProgram;

  if(!this.materialInHash(mId)){
    shaderProgram =
      this.initShaders('vertexColorVert', 'vertexColorFrag', true);
    this.mHash[mId] = shaderProgram;
    shaderProgram.vertexColorAttribute =
    gl.getAttribLocation(shaderProgram, 'aVertexColor');
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
  }else{
    shaderProgram = this.mHash[mId];
  }
  return shaderProgram;
};

module.exports = p5.Renderer3D;
},{"../core/core":48}],31:[function(_dereq_,module,exports){
'use strict';

var p5 = _dereq_('../core/core');

//@TODO: implement full orbit controls including
//pan, zoom, quaternion rotation, etc.
p5.prototype.orbitControl = function(){
  if(this.mouseIsPressed){
    this.rotateY((this.mouseX - this.width / 2) / (this.width / 2));
    this.rotateX((this.mouseY - this.height / 2) / (this.width / 2));
  }
  return this;
};

module.exports = p5;
},{"../core/core":48}],32:[function(_dereq_,module,exports){
/**
 * @module Lights, Camera
 * @submodule Lights
 * @for p5
 * @requires core
 */

'use strict';

var p5 = _dereq_('../core/core');

/**
 * Creates an ambient light with a color
 * @method  ambientLight
 * @param  {Number|Array|String|p5.Color} v1  gray value,
 * red or hue value (depending on the current color mode),
 * or color Array, or CSS color string
 * @param  {Number}            [v2] optional: green or saturation value
 * @param  {Number}            [v3] optional: blue or brightness value
 * @param  {Number}            [a]  optional: opacity
 * @return {p5}                the p5 object
 * @example
 * <div>
 * <code>
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 * }
 * function draw(){
 *   background(0);
 *   ambientLight(150);
 *   ambientMaterial(250);
 *   sphere(200);
 * }
 * </code>
 * </div>
 */
p5.prototype.ambientLight = function(v1, v2, v3, a){
  var gl = this._renderer.GL;
  var shaderProgram = this._renderer._getShader(
    'lightVert', 'lightTextureFrag');

  gl.useProgram(shaderProgram);
  shaderProgram.uAmbientColor = gl.getUniformLocation(
    shaderProgram,
    'uAmbientColor[' + this._renderer.ambientLightCount + ']');

  var color = this._renderer._pInst.color.apply(
    this._renderer._pInst, arguments);
  var colors = color._normalize();

  gl.uniform3f( shaderProgram.uAmbientColor,
    colors[0], colors[1], colors[2]);

  //in case there's no material color for the geometry
  shaderProgram.uMaterialColor = gl.getUniformLocation(
    shaderProgram, 'uMaterialColor' );
  gl.uniform4f( shaderProgram.uMaterialColor, 1, 1, 1, 1);

  this._renderer.ambientLightCount ++;
  shaderProgram.uAmbientLightCount =
    gl.getUniformLocation(shaderProgram, 'uAmbientLightCount');
  gl.uniform1i(shaderProgram.uAmbientLightCount,
    this._renderer.ambientLightCount);

  return this;
};

/**
 * Creates a directional light with a color and a direction
 * @method  directionalLight
 * @param  {Number|Array|String|p5.Color} v1   gray value,
 * red or hue value (depending on the current color mode),
 * or color Array, or CSS color string
 * @param  {Number}          [v2] optional: green or saturation value
 * @param  {Number}          [v3] optional: blue or brightness value
 * @param  {Number}          [a]  optional: opacity
 * @param  {Number|p5.Vector} x   x axis direction or a p5.Vector
 * @param  {Number}          [y]  optional: y axis direction
 * @param  {Number}          [z]  optional: z axis direction
 * @return {p5}              the p5 object
 * @example
 * <div>
 * <code>
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 * }
 * function draw(){
 *   background(0);
 *   //move your mouse to change light direction
 *   var dirX = (mouseX / width - 0.5) *2;
 *   var dirY = (mouseY / height - 0.5) *(-2);
 *   directionalLight(250, 250, 250, dirX, dirY, 0.25);
 *   ambientMaterial(250);
 *   sphere(200, 128);
 * }
 * </code>
 * </div>
 */
p5.prototype.directionalLight = function(v1, v2, v3, a, x, y, z) {
  // TODO(jgessner): Find an example using this and profile it.
  // var args = new Array(arguments.length);
  // for (var i = 0; i < args.length; ++i) {
  //   args[i] = arguments[i];
  // }
  // this._validateParameters(
  //   'directionalLight',
  //   args,
  //   [
  //     //rgbaxyz
  //     ['Number', 'Number', 'Number', 'Number', 'Number', 'Number', 'Number'],
  //     //rgbxyz
  //     ['Number', 'Number', 'Number', 'Number', 'Number', 'Number'],
  //     //caxyz
  //     ['Number', 'Number', 'Number', 'Number', 'Number'],
  //     //cxyz
  //     ['Number', 'Number', 'Number', 'Number'],
  //     ['String', 'Number', 'Number', 'Number'],
  //     ['Array', 'Number', 'Number', 'Number'],
  //     ['Object', 'Number', 'Number', 'Number'],
  //     //rgbavector
  //     ['Number', 'Number', 'Number', 'Number', 'Object'],
  //     //rgbvector
  //     ['Number', 'Number', 'Number', 'Object'],
  //     //cavector
  //     ['Number', 'Number', 'Object'],
  //     //cvector
  //     ['Number', 'Object'],
  //     ['String', 'Object'],
  //     ['Array', 'Object'],
  //     ['Object', 'Object']
  //   ]
  // );

  var gl = this._renderer.GL;
  var shaderProgram = this._renderer._getShader(
    'lightVert', 'lightTextureFrag');

  gl.useProgram(shaderProgram);
  shaderProgram.uDirectionalColor = gl.getUniformLocation(
    shaderProgram,
    'uDirectionalColor[' + this._renderer.directionalLightCount + ']');

  //@TODO: check parameters number
  var color = this._renderer._pInst.color.apply(
    this._renderer._pInst, [v1, v2, v3]);
  var colors = color._normalize();

  gl.uniform3f( shaderProgram.uDirectionalColor,
    colors[0], colors[1], colors[2]);

  var _x, _y, _z;

  if(typeof arguments[arguments.length-1] === 'number'){
    _x = arguments[arguments.length-3];
    _y = arguments[arguments.length-2];
    _z = arguments[arguments.length-1];

  }else{
    try{
      _x = arguments[arguments.length-1].x;
      _y = arguments[arguments.length-1].y;
      _z = arguments[arguments.length-1].z;
    }
    catch(error){
      throw error;
    }
  }

  shaderProgram.uLightingDirection = gl.getUniformLocation(
    shaderProgram,
    'uLightingDirection[' + this._renderer.directionalLightCount + ']');
  gl.uniform3f( shaderProgram.uLightingDirection, _x, _y, _z);

  //in case there's no material color for the geometry
  shaderProgram.uMaterialColor = gl.getUniformLocation(
    shaderProgram, 'uMaterialColor' );
  gl.uniform4f( shaderProgram.uMaterialColor, 1, 1, 1, 1);

  this._renderer.directionalLightCount ++;
  shaderProgram.uDirectionalLightCount =
    gl.getUniformLocation(shaderProgram, 'uDirectionalLightCount');
  gl.uniform1i(shaderProgram.uDirectionalLightCount,
    this._renderer.directionalLightCount);

  return this;
};

/**
 * Creates a point light with a color and a light position
 * @method  pointLight
 * @param  {Number|Array|String|p5.Color} v1   gray value,
 * red or hue value (depending on the current color mode),
 * or color Array, or CSS color string
 * @param  {Number}          [v2] optional: green or saturation value
 * @param  {Number}          [v3] optional: blue or brightness value
 * @param  {Number}          [a]  optional: opacity
 * @param  {Number|p5.Vector} x   x axis position or a p5.Vector
 * @param  {Number}          [y]  optional: y axis position
 * @param  {Number}          [z]  optional: z axis position
 * @return {p5}              the p5 object
 * @example
 * <div>
 * <code>
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 * }
 * function draw(){
 *   background(0);
 *   //move your mouse to change light position
 *   var locY = (mouseY / height - 0.5) *(-2);
 *   var locX = (mouseX / width - 0.5) *2;
 *   //to set the light position,
 *   //think of the world's coordinate as:
 *   // -1,1 -------- 1,1
 *   //   |            |
 *   //   |            |
 *   //   |            |
 *   // -1,-1---------1,-1
 *   pointLight(250, 250, 250, locX, locY, 0);
 *   ambientMaterial(250);
 *   sphere(200, 128);
 * }
 * </code>
 * </div>
 */
p5.prototype.pointLight = function(v1, v2, v3, a, x, y, z) {
  // TODO(jgessner): Find an example using this and profile it.
  // var args = new Array(arguments.length);
  // for (var i = 0; i < args.length; ++i) {
  //   args[i] = arguments[i];
  // }
  // this._validateParameters(
  //   'pointLight',
  //   arguments,
  //   [
  //     //rgbaxyz
  //     ['Number', 'Number', 'Number', 'Number', 'Number', 'Number', 'Number'],
  //     //rgbxyz
  //     ['Number', 'Number', 'Number', 'Number', 'Number', 'Number'],
  //     //caxyz
  //     ['Number', 'Number', 'Number', 'Number', 'Number'],
  //     //cxyz
  //     ['Number', 'Number', 'Number', 'Number'],
  //     ['String', 'Number', 'Number', 'Number'],
  //     ['Array', 'Number', 'Number', 'Number'],
  //     ['Object', 'Number', 'Number', 'Number'],
  //     //rgbavector
  //     ['Number', 'Number', 'Number', 'Number', 'Object'],
  //     //rgbvector
  //     ['Number', 'Number', 'Number', 'Object'],
  //     //cavector
  //     ['Number', 'Number', 'Object'],
  //     //cvector
  //     ['Number', 'Object'],
  //     ['String', 'Object'],
  //     ['Array', 'Object'],
  //     ['Object', 'Object']
  //   ]
  // );

  var gl = this._renderer.GL;
  var shaderProgram = this._renderer._getShader(
    'lightVert', 'lightTextureFrag');

  gl.useProgram(shaderProgram);
  shaderProgram.uPointLightColor = gl.getUniformLocation(
    shaderProgram,
    'uPointLightColor[' + this._renderer.pointLightCount + ']');

  //@TODO: check parameters number
  var color = this._renderer._pInst.color.apply(
    this._renderer._pInst, [v1, v2, v3]);
  var colors = color._normalize();

  gl.uniform3f( shaderProgram.uPointLightColor,
    colors[0], colors[1], colors[2]);

  var _x, _y, _z;

  if(typeof arguments[arguments.length-1] === 'number'){
    _x = arguments[arguments.length-3];
    _y = arguments[arguments.length-2];
    _z = arguments[arguments.length-1];

  }else{
    try{
      _x = arguments[arguments.length-1].x;
      _y = arguments[arguments.length-1].y;
      _z = arguments[arguments.length-1].z;
    }
    catch(error){
      throw error;
    }
  }

  shaderProgram.uPointLightLocation = gl.getUniformLocation(
    shaderProgram,
    'uPointLightLocation[' + this._renderer.pointLightCount + ']');
  gl.uniform3f( shaderProgram.uPointLightLocation, _x, _y, _z);

  //in case there's no material color for the geometry
  shaderProgram.uMaterialColor = gl.getUniformLocation(
    shaderProgram, 'uMaterialColor' );
  gl.uniform4f( shaderProgram.uMaterialColor, 1, 1, 1, 1);

  this._renderer.pointLightCount ++;
  shaderProgram.uPointLightCount =
    gl.getUniformLocation(shaderProgram, 'uPointLightCount');
  gl.uniform1i(shaderProgram.uPointLightCount,
    this._renderer.pointLightCount);

  return this;
};

module.exports = p5;

},{"../core/core":48}],33:[function(_dereq_,module,exports){
/**
 * @module Lights, Camera
 * @submodule Material
 * @for p5
 * @requires core
 */

'use strict';

var p5 = _dereq_('../core/core');
//require('./p5.Texture');

/**
 * Normal material for geometry
 * @method normalMaterial
 * @return {p5}                the p5 object
 * @example
 * <div>
 * <code>
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 * }
 *
 * function draw(){
 *  background(0);
 *  normalMaterial();
 *  sphere(200);
 * }
 * </code>
 * </div>
 */
p5.prototype.normalMaterial = function(){
  this._renderer._getShader('normalVert', 'normalFrag');
  return this;
};

/**
 * Texture for geometry
 * @method texture
 * @return {p5}                the p5 object
 * @example
 * <div>
 * <code>
 * var img;
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 *   img = loadImage("assets/cat.jpg");
 * }
 *
 * function draw(){
 *   background(0);
 *   rotateZ(frameCount * 0.01);
 *   rotateX(frameCount * 0.01);
 *   rotateY(frameCount * 0.01);
 *   //pass image as texture
 *   texture(img);
 *   box(200, 200, 200);
 * }
 * </code>
 * </div>
 */
p5.prototype.texture = function(image){
  var gl = this._renderer.GL;
  var shaderProgram = this._renderer._getShader('lightVert',
    'lightTextureFrag');
  gl.useProgram(shaderProgram);
  var tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

  // Currently buggy, likely bc of p5 object types
  // if(!this._isPowerOf2(image.width) || !this._isPowerOf2(image.height)){
  //   image.width = _nextHighestPOT(image.width);
  //   image.height = _nextHighestPOT(image.height);
  // }
  if (image instanceof p5.Image) {
    image.loadPixels();
    var data = new Uint8Array(image.pixels);
    gl.texImage2D(gl.TEXTURE_2D, 0,
      gl.RGBA, image.width, image.height,
      0, gl.RGBA, gl.UNSIGNED_BYTE, data);
  }
  //if param is a video
  else if (image instanceof p5.MediaElement){
    if(!image.loadedmetadata) {return;}
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
    gl.UNSIGNED_BYTE, image.elt);
  }
  else {
    //@TODO handle following cases:
    //- 2D canvas (p5 inst)
  }
  if (_isPowerOf2(image.width) && _isPowerOf2(image.height)) {
    gl.generateMipmap(gl.TEXTURE_2D);
  } else {
    image.width = _nextHighestPOT(image.width);
    image.height = _nextHighestPOT(image.height);
    gl.texParameteri(gl.TETXURE_2D,
      gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TETXURE_2D,
      gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TETXURE_2D,
      gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }
  //this is where we'd activate multi textures
  //eg. gl.activeTexture(gl.TEXTURE0 + (unit || 0));
  //but for now we just have a single texture.
  //@TODO need to extend this functionality
  gl.activeTexture(gl.TEXTURE0 + 0);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.uniform1i(gl.getUniformLocation(shaderProgram, 'uSampler'), 0);
  gl.uniform1i(gl.getUniformLocation(shaderProgram, 'isTexture'), true);
  return this;
};

/**
 * Helper functions; Checks whether val is a pot
 * more info on power of 2 here:
 * https://www.opengl.org/wiki/NPOT_Texture
 * @param  {Number}  value
 * @return {Boolean}
 */
function _isPowerOf2 (value){
  return (value & (value - 1)) === 0;
}

/**
 * returns the next highest power of 2 value
 * @param  {Number} value [description]
 * @return {Number}       [description]
 */
function _nextHighestPOT (value){
  --value;
  for (var i = 1; i < 32; i <<= 1) {
    value = value | value >> i;
  }
  return value + 1;
}

/**
 * Basic material for geometry with a given color
 * @method  basicMaterial
 * @param  {Number|Array|String|p5.Color} v1  gray value,
 * red or hue value (depending on the current color mode),
 * or color Array, or CSS color string
 * @param  {Number}            [v2] optional: green or saturation value
 * @param  {Number}            [v3] optional: blue or brightness value
 * @param  {Number}            [a]  optional: opacity
 * @return {p5}                the p5 object
 * @example
 * <div>
 * <code>
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 * }
 *
 * function draw(){
 *  background(0);
 *  basicMaterial(250, 0, 0);
 *  rotateX(frameCount * 0.01);
 *  rotateY(frameCount * 0.01);
 *  rotateZ(frameCount * 0.01);
 *  box(200, 200, 200);
 * }
 * </code>
 * </div>
 */
p5.prototype.basicMaterial = function(v1, v2, v3, a){
  var gl = this._renderer.GL;

  var shaderProgram = this._renderer._getShader('normalVert', 'basicFrag');

  gl.useProgram(shaderProgram);
  shaderProgram.uMaterialColor = gl.getUniformLocation(
    shaderProgram, 'uMaterialColor' );

  var color = this._renderer._pInst.color.apply(
    this._renderer._pInst, arguments);
  var colors = color._normalize();

  gl.uniform4f( shaderProgram.uMaterialColor,
    colors[0], colors[1], colors[2], colors[3]);

  return this;

};

/**
 * Ambient material for geometry with a given color
 * @method  ambientMaterial
 * @param  {Number|Array|String|p5.Color} v1  gray value,
 * red or hue value (depending on the current color mode),
 * or color Array, or CSS color string
 * @param  {Number}            [v2] optional: green or saturation value
 * @param  {Number}            [v3] optional: blue or brightness value
 * @param  {Number}            [a]  optional: opacity
* @return {p5}                 the p5 object
 * @example
 * <div>
 * <code>
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 * }
 * function draw(){
 *  background(0);
 *  ambientLight(100);
 *  pointLight(250, 250, 250, 100, 100, 0);
 *  ambientMaterial(250);
 *  sphere(200, 128);
 * }
 * </code>
 * </div>
 */
p5.prototype.ambientMaterial = function(v1, v2, v3, a) {
  var gl = this._renderer.GL;
  var shaderProgram =
    this._renderer._getShader('lightVert', 'lightTextureFrag');

  gl.useProgram(shaderProgram);
  shaderProgram.uMaterialColor = gl.getUniformLocation(
    shaderProgram, 'uMaterialColor' );

  var color = this._renderer._pInst.color.apply(
    this._renderer._pInst, arguments);
  var colors = color._normalize();

  gl.uniform4f(shaderProgram.uMaterialColor,
    colors[0], colors[1], colors[2], colors[3]);

  shaderProgram.uSpecular = gl.getUniformLocation(
    shaderProgram, 'uSpecular' );
  gl.uniform1i(shaderProgram.uSpecular, false);

  gl.uniform1i(gl.getUniformLocation(shaderProgram, 'isTexture'), false);

  return this;
};

/**
 * Specular material for geometry with a given color
 * @method specularMaterial
 * @param  {Number|Array|String|p5.Color} v1  gray value,
 * red or hue value (depending on the current color mode),
 * or color Array, or CSS color string
 * @param  {Number}            [v2] optional: green or saturation value
 * @param  {Number}            [v3] optional: blue or brightness value
 * @param  {Number}            [a]  optional: opacity
 * @return {p5}                the p5 object
 * @example
 * <div>
 * <code>
 * function setup(){
 *   createCanvas(100, 100, WEBGL);
 * }
 * function draw(){
 *  background(0);
 *  ambientLight(100);
 *  pointLight(250, 250, 250, 100, 100, 0);
 *  specularMaterial(250);
 *  sphere(200, 128);
 * }
 * </code>
 * </div>
 */
p5.prototype.specularMaterial = function(v1, v2, v3, a) {
  var gl = this._renderer.GL;
  var shaderProgram =
    this._renderer._getShader('lightVert', 'lightTextureFrag');

  gl.useProgram(shaderProgram);
  shaderProgram.uMaterialColor = gl.getUniformLocation(
    shaderProgram, 'uMaterialColor' );

  var color = this._renderer._pInst.color.apply(
    this._renderer._pInst, arguments);
  var colors = color._normalize();

  gl.uniform4f(shaderProgram.uMaterialColor,
    colors[0], colors[1], colors[2], colors[3]);

  shaderProgram.uSpecular = gl.getUniformLocation(
    shaderProgram, 'uSpecular' );
  gl.uniform1i(shaderProgram.uSpecular, true);

  gl.uniform1i(gl.getUniformLocation(shaderProgram, 'isTexture'), false);

  return this;
};

module.exports = p5;
},{"../core/core":48}],34:[function(_dereq_,module,exports){
//functions are adjusted from Three.js(http://threejs.org)

'use strict';

var p5 = _dereq_('../core/core');

/**
 * p5 Geometry3D class
 */
p5.Geometry3D = function(){
  //an array holding every vertice
  //each vertex is a p5.Vector
  this.vertices = [];
  //an array holding each normals for each vertice
  //each normal is a p5.Vector
  this.vertexNormals = [];
  //an array holding each three indecies of vertices that form a face
  //[[0, 1, 2], [1, 2, 3], ...]
  this.faces = [];
  //an array holding every noraml for each face
  //each faceNormal is a p5.Vector
  //[[p5.Vector, p5.Vector, p5.Vector],[p5.Vector, p5.Vector, p5.Vector],...]
  this.faceNormals = [];
  //an array of array holding uvs (group according to faces)
  //[[[0, 0], [1, 0], [1, 0]],...]
  this.uvs = [];
};

/**
 * generate geometriy with parametric method
 * @param  {Function} func  callback function for how to generate geometry
 * @param  {Number} detailX number of vertices on horizontal surface
 * @param  {Number} detailY number of vertices on horizontal surface
 * @param  {Number} offset  offset of vertices index
 */
p5.Geometry3D.prototype.parametricGeometry = function
//@TODO: put func as the last parameters
(func, detailX, detailY, offset){

  var i, j, p;
  var u, v;
  offset = offset || 0;

  var sliceCount = detailX + 1;
  for (i = 0; i <= detailY; i++){
    v = i / detailY;
    for (j = 0; j <= detailX; j++){
      u = j / detailX;
      p = func(u, v);
      this.vertices.push(p);
    }
  }

  var a, b, c, d;
  var uva, uvb, uvc, uvd;

  for (i = 0; i < detailY; i++){
    for (j = 0; j < detailX; j++){
      a = i * sliceCount + j + offset;
      b = i * sliceCount + j + 1 + offset;
      c = (i + 1)* sliceCount + j + 1 + offset;
      d = (i + 1)* sliceCount + j + offset;

      uva = [j/detailX, i/detailY];
      uvb = [(j + 1)/ detailX, i/detailY];
      uvc = [(j + 1)/ detailX, (i + 1)/detailY];
      uvd = [j/detailX, (i + 1)/detailY];

      this.faces.push([a, b, d]);
      this.uvs.push([uva, uvb, uvd]);

      this.faces.push([b, c, d]);
      this.uvs.push([uvb, uvc, uvd]);
    }
  }
};

/**
 * merge duplicated vertices
 */
p5.Geometry3D.prototype.mergeVertices= function () {

  var verticesMap = {};
  var unique = [], changes = [];

  var v, key;
  var precisionPoints = 4;
  var precision = Math.pow(10, precisionPoints);
  var i, face;
  var indices;

  for (i = 0; i < this.vertices.length; i ++) {

    v = this.vertices[i];
    key = Math.round(v.x * precision) + '_' +
    Math.round(v.y * precision) + '_' +
    Math.round(v.z * precision);

    if (verticesMap[key] === undefined) {
      verticesMap[key] = i;
      unique.push(this.vertices[i]);
      changes[i] = unique.length - 1;
    } else {
      changes[i] = changes[verticesMap[key]];
    }

  }
  // if faces are completely degenerate after merging vertices, we
  // have to remove them from the geometry.
  var faceIndicesToRemove = [];

  for (i = 0; i < this.faces.length; i ++) {

    face = this.faces[i];

    face[0] = changes[face[0]];
    face[1] = changes[face[1]];
    face[2] = changes[face[2]];

    indices = [face[0], face[1], face[2]];

    var dupIndex = - 1;

    // if any duplicate vertices are found in a Face
    // we have to remove the face as nothing can be saved
    for (var n = 0; n < 3; n ++) {
      if (indices[n] === indices[(n + 1) % 3]) {
        dupIndex = n;
        faceIndicesToRemove.push(i);
        break;
      }
    }
  }

  for (i = faceIndicesToRemove.length - 1; i >= 0; i --) {
    var idx = faceIndicesToRemove[i];
    this.faces.splice(idx, 1);
  }

  // Use unique set of vertices
  var diff = this.vertices.length - unique.length;
  this.vertices = unique;
  return diff;

};

/**
 * compute faceNormals for a geometry
 */
p5.Geometry3D.prototype.computeFaceNormals = function(){

  var cb = new p5.Vector();
  var ab = new p5.Vector();

  for (var f = 0; f < this.faces.length; f++){
    var face = this.faces[f];
    var vA = this.vertices[face[0]];
    var vB = this.vertices[face[1]];
    var vC = this.vertices[face[2]];

    p5.Vector.sub(vC, vB, cb);
    p5.Vector.sub(vA, vB, ab);

    var normal = p5.Vector.cross(ab, cb);
    normal.normalize();
    normal.mult(-1);
    this.faceNormals[f] = normal;
  }

};

/**
 * compute vertexNormals for a geometry
 */
p5.Geometry3D.prototype.computeVertexNormals = function (){

  var v, f, face, faceNormal, vertices;
  var vertexNormals = [];

  vertices = new Array(this.vertices.length);
  for (v = 0; v < this.vertices.length; v++) {
    vertices[v] = new p5.Vector();
  }

  for (f = 0; f < this.faces.length; f++) {
    face = this.faces[f];
    faceNormal = this.faceNormals[f];

    vertices[face[0]].add(faceNormal);
    vertices[face[1]].add(faceNormal);
    vertices[face[2]].add(faceNormal);
  }

  for (v = 0; v < this.vertices.length; v++) {
    vertices[v].normalize();
  }

  for (f = 0; f < this.faces.length; f++) {
    face = this.faces[f];
    vertexNormals[f] = [];
    vertexNormals[f][0]= vertices[face[0]].copy();
    vertexNormals[f][1]= vertices[face[1]].copy();
    vertexNormals[f][2]= vertices[face[2]].copy();
  }

  for (f = 0; f < this.faces.length; f++){
    face = this.faces[f];
    faceNormal = this.faceNormals[f];
    this.vertexNormals[face[0]] = vertexNormals[f][0];
    this.vertexNormals[face[1]] = vertexNormals[f][1];
    this.vertexNormals[face[2]] = vertexNormals[f][2];
  }

};

p5.Geometry3D.prototype.generateUV = function(faces, uvs){

  faces = flatten(faces);
  uvs = flatten(uvs);
  var arr = [];
  faces.forEach(function(item, index){
    arr[item] = uvs[index];
  });
  return flatten(arr);
};


/**
 * generate an object containing information needed to create buffer
 */
p5.Geometry3D.prototype.generateObj = function(noMerge){
  if(!noMerge){
    this.mergeVertices();
  }
  this.computeFaceNormals();
  this.computeVertexNormals();

  var obj = {
    vertices: turnVectorArrayIntoNumberArray(this.vertices),
    vertexNormals: turnVectorArrayIntoNumberArray(this.vertexNormals),
    uvs: this.generateUV(this.faces, this.uvs),
    faces: flatten(this.faces),
    len: this.faces.length * 3
  };
  return obj;
};

/**
 * turn a two dimensional array into one dimensional array
 * @param  {Array} arr 2-dimensional array
 * @return {Array}     1-dimensional array
 * [[1, 2, 3],[4, 5, 6]] -> [1, 2, 3, 4, 5, 6]
 */
function flatten(arr){
  return arr.reduce(function(a, b){
    return a.concat(b);
  });
}

/**
 * turn an array of Vector into a one dimensional array of numbers
 * @param  {Array} arr  an array of p5.Vector
 * @return {Array]}     a one dimensional array of numbers
 * [p5.Vector(1, 2, 3), p5.Vector(4, 5, 6)] ->
 * [1, 2, 3, 4, 5, 6]
 */
function turnVectorArrayIntoNumberArray(arr){
  return flatten(arr.map(function(item){
    return [item.x, item.y, item.z];
  }));
}

module.exports = p5.Geometry3D;
},{"../core/core":48}],35:[function(_dereq_,module,exports){
/**
* @requires constants
* @todo see methods below needing further implementation.
* future consideration: implement SIMD optimizations
* when browser compatibility becomes available
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/
*   Reference/Global_Objects/SIMD
*/

'use strict';

var p5 = _dereq_('../core/core');
var polarGeometry = _dereq_('../math/polargeometry');
var constants = _dereq_('../core/constants');
var GLMAT_ARRAY_TYPE = (
    typeof Float32Array !== 'undefined') ?
  Float32Array : Array;

/**
 * A class to describe a 4x4 matrix
 * for model and view matrix manipulation in the p5js webgl renderer.
 * class p5.Matrix
 * @constructor
 * @param {Array} [mat4] array literal of our 4x4 matrix
 */
p5.Matrix = function() {
  // This is how it comes in with createMatrix()
  if(arguments[0] instanceof p5) {
    // save reference to p5 if passed in
    this.p5 = arguments[0];
    this.mat4  = arguments[1] || new GLMAT_ARRAY_TYPE([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
  // This is what we'll get with new p5.Matrix()
  // a mat4 identity matrix
  } else {
    this.mat4 = arguments[0] || new GLMAT_ARRAY_TYPE([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
  }
  return this;
};

/**
 * Sets the x, y, and z component of the vector using two or three separate
 * variables, the data from a p5.Matrix, or the values from a float array.
 *
 * @param {p5.Matrix|Array} [inMatrix] the input p5.Matrix or
 *                                     an Array of length 16
 */
p5.Matrix.prototype.set = function (inMatrix) {
  if (inMatrix instanceof p5.Matrix) {
    this.mat4 = inMatrix.mat4;
    return this;
  }
  else if (inMatrix instanceof GLMAT_ARRAY_TYPE) {
    this.mat4 = inMatrix;
    return this;
  }
  return this;
};

/**
 * Gets a copy of the vector, returns a p5.Matrix object.
 *
 * @return {p5.Matrix} the copy of the p5.Matrix object
 */
p5.Matrix.prototype.get = function () {
  return new p5.Matrix(this.mat4);
};

/**
 * return a copy of a matrix
 * @return {p5.Matrix}   the result matrix
 */
p5.Matrix.prototype.copy = function(){
  var copied = new p5.Matrix();
  copied.mat4[0] = this.mat4[0];
  copied.mat4[1] = this.mat4[1];
  copied.mat4[2] = this.mat4[2];
  copied.mat4[3] = this.mat4[3];
  copied.mat4[4] = this.mat4[4];
  copied.mat4[5] = this.mat4[5];
  copied.mat4[6] = this.mat4[6];
  copied.mat4[7] = this.mat4[7];
  copied.mat4[8] = this.mat4[8];
  copied.mat4[9] = this.mat4[9];
  copied.mat4[10] = this.mat4[10];
  copied.mat4[11] = this.mat4[11];
  copied.mat4[12] = this.mat4[12];
  copied.mat4[13] = this.mat4[13];
  copied.mat4[14] = this.mat4[14];
  copied.mat4[15] = this.mat4[15];
  return copied;
};

/**
 * return an identity matrix
 * @return {p5.Matrix}   the result matrix
 */
p5.Matrix.identity = function(){
  return new p5.Matrix();
};

/**
 * transpose according to a given matrix
 * @param  {p5.Matrix | Typed Array} a  the matrix to be based on to transpose
 * @return {p5.Matrix}                  this
 */
p5.Matrix.prototype.transpose = function(a){
  var a01, a02, a03, a12, a13, a23;
  if(a instanceof p5.Matrix){
    a01 = a.mat4[1];
    a02 = a.mat4[2];
    a03 = a.mat4[3];
    a12 = a.mat4[6];
    a13 = a.mat4[7];
    a23 = a.mat4[11];

    this.mat4[0] = a.mat4[0];
    this.mat4[1] = a.mat4[4];
    this.mat4[2] = a.mat4[8];
    this.mat4[3] = a.mat4[12];
    this.mat4[4] = a01;
    this.mat4[5] = a.mat4[5];
    this.mat4[6] = a.mat4[9];
    this.mat4[7] = a.mat4[13];
    this.mat4[8] = a02;
    this.mat4[9] = a12;
    this.mat4[10] = a.mat4[10];
    this.mat4[11] = a.mat4[14];
    this.mat4[12] = a03;
    this.mat4[13] = a13;
    this.mat4[14] = a23;
    this.mat4[15] = a.mat4[15];

  }else if(a instanceof GLMAT_ARRAY_TYPE){
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a12 = a[6];
    a13 = a[7];
    a23 = a[11];

    this.mat4[0] = a[0];
    this.mat4[1] = a[4];
    this.mat4[2] = a[8];
    this.mat4[3] = a[12];
    this.mat4[4] = a01;
    this.mat4[5] = a[5];
    this.mat4[6] = a[9];
    this.mat4[7] = a[13];
    this.mat4[8] = a02;
    this.mat4[9] = a12;
    this.mat4[10] = a[10];
    this.mat4[11] = a[14];
    this.mat4[12] = a03;
    this.mat4[13] = a13;
    this.mat4[14] = a23;
    this.mat4[15] = a[15];
  }
  return this;
};

/**
 * invert  matrix according to a give matrix
 * @param  {p5.Matrix or Typed Array} a   the matrix to be based on to invert
 * @return {p5.Matrix}                    this
 */
p5.Matrix.prototype.invert = function(a){
  var a00, a01, a02, a03, a10, a11, a12, a13,
  a20, a21, a22, a23, a30, a31, a32, a33;
  if(a instanceof p5.Matrix){
    a00 = a.mat4[0];
    a01 = a.mat4[1];
    a02 = a.mat4[2];
    a03 = a.mat4[3];
    a10 = a.mat4[4];
    a11 = a.mat4[5];
    a12 = a.mat4[6];
    a13 = a.mat4[7];
    a20 = a.mat4[8];
    a21 = a.mat4[9];
    a22 = a.mat4[10];
    a23 = a.mat4[11];
    a30 = a.mat4[12];
    a31 = a.mat4[13];
    a32 = a.mat4[14];
    a33 = a.mat4[15];
  }else if(a instanceof GLMAT_ARRAY_TYPE){
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    a30 = a[12];
    a31 = a[13];
    a32 = a[14];
    a33 = a[15];
  }
  var b00 = a00 * a11 - a01 * a10,
  b01 = a00 * a12 - a02 * a10,
  b02 = a00 * a13 - a03 * a10,
  b03 = a01 * a12 - a02 * a11,
  b04 = a01 * a13 - a03 * a11,
  b05 = a02 * a13 - a03 * a12,
  b06 = a20 * a31 - a21 * a30,
  b07 = a20 * a32 - a22 * a30,
  b08 = a20 * a33 - a23 * a30,
  b09 = a21 * a32 - a22 * a31,
  b10 = a21 * a33 - a23 * a31,
  b11 = a22 * a33 - a23 * a32,

  // Calculate the determinant
  det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 -
  b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  this.mat4[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  this.mat4[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  this.mat4[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  this.mat4[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  this.mat4[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  this.mat4[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  this.mat4[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  this.mat4[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  this.mat4[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  this.mat4[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  this.mat4[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  this.mat4[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  this.mat4[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  this.mat4[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  this.mat4[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  this.mat4[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

  return this;
};

/**
 * inspired by Toji's mat4 determinant
 * @return {Number} Determinant of our 4x4 matrix
 */
p5.Matrix.prototype.determinant = function(){
  var d00 = (this.mat4[0] * this.mat4[5]) - (this.mat4[1] * this.mat4[4]),
    d01 = (this.mat4[0] * this.mat4[6]) - (this.mat4[2] * this.mat4[4]),
    d02 = (this.mat4[0] * this.mat4[7]) - (this.mat4[3] * this.mat4[4]),
    d03 = (this.mat4[1] * this.mat4[6]) - (this.mat4[2] * this.mat4[5]),
    d04 = (this.mat4[1] * this.mat4[7]) - (this.mat4[3] * this.mat4[5]),
    d05 = (this.mat4[2] * this.mat4[7]) - (this.mat4[3] * this.mat4[6]),
    d06 = (this.mat4[8] * this.mat4[13]) - (this.mat4[9] * this.mat4[12]),
    d07 = (this.mat4[8] * this.mat4[14]) - (this.mat4[10] * this.mat4[12]),
    d08 = (this.mat4[8] * this.mat4[15]) - (this.mat4[11] * this.mat4[12]),
    d09 = (this.mat4[9] * this.mat4[14]) - (this.mat4[10] * this.mat4[13]),
    d10 = (this.mat4[9] * this.mat4[15]) - (this.mat4[11] * this.mat4[13]),
    d11 = (this.mat4[10] * this.mat4[15]) - (this.mat4[11] * this.mat4[14]);

  // Calculate the determinant
  return d00 * d11 - d01 * d10 + d02 * d09 +
    d03 * d08 - d04 * d07 + d05 * d06;
};

/**
 * multiply two mat4s
 * @param {p5.Matrix | Array}  multMatrix The matrix we want to multiply by
 * @return {p5.Matrix}         this
 */
p5.Matrix.prototype.mult = function(multMatrix){
  var _dest = new GLMAT_ARRAY_TYPE(16);
  var _src = new GLMAT_ARRAY_TYPE(16);

  if(multMatrix instanceof p5.Matrix) {
    _src = multMatrix.mat4;
  }
  else if(multMatrix instanceof GLMAT_ARRAY_TYPE){
    _src = multMatrix;
  }

  // each row is used for the multiplier
  var b0  = this.mat4[0], b1 = this.mat4[1],
    b2 = this.mat4[2], b3 = this.mat4[3];
  _dest[0] = b0*_src[0] + b1*_src[4] + b2*_src[8] + b3*_src[12];
  _dest[1] = b0*_src[1] + b1*_src[5] + b2*_src[9] + b3*_src[13];
  _dest[2] = b0*_src[2] + b1*_src[6] + b2*_src[10] + b3*_src[14];
  _dest[3] = b0*_src[3] + b1*_src[7] + b2*_src[11] + b3*_src[15];

  b0 = this.mat4[4];
  b1 = this.mat4[5];
  b2 = this.mat4[6];
  b3 = this.mat4[7];
  _dest[4] = b0*_src[0] + b1*_src[4] + b2*_src[8] + b3*_src[12];
  _dest[5] = b0*_src[1] + b1*_src[5] + b2*_src[9] + b3*_src[13];
  _dest[6] = b0*_src[2] + b1*_src[6] + b2*_src[10] + b3*_src[14];
  _dest[7] = b0*_src[3] + b1*_src[7] + b2*_src[11] + b3*_src[15];

  b0 = this.mat4[8];
  b1 = this.mat4[9];
  b2 = this.mat4[10];
  b3 = this.mat4[11];
  _dest[8] = b0*_src[0] + b1*_src[4] + b2*_src[8] + b3*_src[12];
  _dest[9] = b0*_src[1] + b1*_src[5] + b2*_src[9] + b3*_src[13];
  _dest[10] = b0*_src[2] + b1*_src[6] + b2*_src[10] + b3*_src[14];
  _dest[11] = b0*_src[3] + b1*_src[7] + b2*_src[11] + b3*_src[15];

  b0 = this.mat4[12];
  b1 = this.mat4[13];
  b2 = this.mat4[14];
  b3 = this.mat4[15];
  _dest[12] = b0*_src[0] + b1*_src[4] + b2*_src[8] + b3*_src[12];
  _dest[13] = b0*_src[1] + b1*_src[5] + b2*_src[9] + b3*_src[13];
  _dest[14] = b0*_src[2] + b1*_src[6] + b2*_src[10] + b3*_src[14];
  _dest[15] = b0*_src[3] + b1*_src[7] + b2*_src[11] + b3*_src[15];

  this.mat4 = _dest;

  return this;
};

/**
 * scales a p5.Matrix by scalars or a vector
 * @param  {p5.Vector | Array }
 *                      vector to scale by
 * @return {p5.Matrix}  this
 */
p5.Matrix.prototype.scale = function() {
  var x,y,z;
  var args = new Array(arguments.length);
  for(var i = 0; i < args.length; i++) {
    args[i] = arguments[i];
  }
  //if our 1st arg is a type p5.Vector
  if (args[0] instanceof p5.Vector){
    x = args[0].x;
    y = args[0].y;
    z = args[0].z;
  }
  //otherwise if it's an array
  else if (args[0] instanceof Array){
    x = args[0][0];
    y = args[0][1];
    z = args[0][2];
  }
  var _dest = new GLMAT_ARRAY_TYPE(16);
  _dest[0] = this.mat4[0] * x;
  _dest[1] = this.mat4[1] * x;
  _dest[2] = this.mat4[2] * x;
  _dest[3] = this.mat4[3] * x;
  _dest[4] = this.mat4[4] * y;
  _dest[5] = this.mat4[5] * y;
  _dest[6] = this.mat4[6] * y;
  _dest[7] = this.mat4[7] * y;
  _dest[8] = this.mat4[8] * z;
  _dest[9] = this.mat4[9] * z;
  _dest[10] = this.mat4[10] * z;
  _dest[11] = this.mat4[11] * z;
  _dest[12] = this.mat4[12];
  _dest[13] = this.mat4[13];
  _dest[14] = this.mat4[14];
  _dest[15] = this.mat4[15];

  this.mat4 = _dest;
  return this;
};

/**
 * rotate our Matrix around an axis by the given angle.
 * @param  {Number} a The angle of rotation in radians
 * @param  {p5.Vector | Array} axis  the axis(es) to rotate around
 * @return {p5.Matrix}                    this
 * inspired by Toji's gl-matrix lib, mat4 rotation
 */
p5.Matrix.prototype.rotate = function(a, axis){
  var x, y, z, _a, len;

  if (this.p5) {
    if (this.p5._angleMode === constants.DEGREES) {
      _a = polarGeometry.degreesToRadians(a);
    }
  }
  else {
    _a = a;
  }
  if (axis instanceof p5.Vector) {
    x = axis.x;
    y = axis.y;
    z = axis.z;
  }
  else if (axis instanceof Array) {
    x = axis[0];
    y = axis[1];
    z = axis[2];
  }

  len = Math.sqrt(x * x + y * y + z * z);
  x *= (1/len);
  y *= (1/len);
  z *= (1/len);

  var a00 = this.mat4[0];
  var a01 = this.mat4[1];
  var a02 = this.mat4[2];
  var a03 = this.mat4[3];
  var a10 = this.mat4[4];
  var a11 = this.mat4[5];
  var a12 = this.mat4[6];
  var a13 = this.mat4[7];
  var a20 = this.mat4[8];
  var a21 = this.mat4[9];
  var a22 = this.mat4[10];
  var a23 = this.mat4[11];

  //sin,cos, and tan of respective angle
  var sA = Math.sin(_a);
  var cA = Math.cos(_a);
  var tA = 1 - cA;
  // Construct the elements of the rotation matrix
  var b00 = x * x * tA + cA;
  var b01 = y * x * tA + z * sA;
  var b02 = z * x * tA - y * sA;
  var b10 = x * y * tA - z * sA;
  var b11 = y * y * tA + cA;
  var b12 = z * y * tA + x * sA;
  var b20 = x * z * tA + y * sA;
  var b21 = y * z * tA - x * sA;
  var b22 = z * z * tA + cA;

  // rotation-specific matrix multiplication
  this.mat4[0] = a00 * b00 + a10 * b01 + a20 * b02;
  this.mat4[1] = a01 * b00 + a11 * b01 + a21 * b02;
  this.mat4[2] = a02 * b00 + a12 * b01 + a22 * b02;
  this.mat4[3] = a03 * b00 + a13 * b01 + a23 * b02;
  this.mat4[4] = a00 * b10 + a10 * b11 + a20 * b12;
  this.mat4[5] = a01 * b10 + a11 * b11 + a21 * b12;
  this.mat4[6] = a02 * b10 + a12 * b11 + a22 * b12;
  this.mat4[7] = a03 * b10 + a13 * b11 + a23 * b12;
  this.mat4[8] = a00 * b20 + a10 * b21 + a20 * b22;
  this.mat4[9] = a01 * b20 + a11 * b21 + a21 * b22;
  this.mat4[10] = a02 * b20 + a12 * b21 + a22 * b22;
  this.mat4[11] = a03 * b20 + a13 * b21 + a23 * b22;

  return this;
};

/**
 * @todo  finish implementing this method!
 * translates
 * @param  {Array} v vector to translate by
 * @return {p5.Matrix}                    this
 */
p5.Matrix.prototype.translate = function(v){
  var x = v[0],
    y = v[1],
    z = v[2];
  this.mat4[12] =
    this.mat4[0] * x +this.mat4[4] * y +this.mat4[8] * z +this.mat4[12];
  this.mat4[13] =
    this.mat4[1] * x +this.mat4[5] * y +this.mat4[9] * z +this.mat4[13];
  this.mat4[14] =
    this.mat4[2] * x +this.mat4[6] * y +this.mat4[10] * z +this.mat4[14];
  this.mat4[15] =
    this.mat4[3] * x +this.mat4[7] * y +this.mat4[11] * z +this.mat4[15];
};

p5.Matrix.prototype.rotateX = function(a){
  this.rotate(a, [1,0,0]);
};
p5.Matrix.prototype.rotateY = function(a){
  this.rotate(a, [0,1,0]);
};
p5.Matrix.prototype.rotateZ = function(a){
  this.rotate(a, [0,0,1]);
};

/**
 * sets the perspective matrix
 * @param  {Number} fovy   [description]
 * @param  {Number} aspect [description]
 * @param  {Number} near   near clipping plane
 * @param  {Number} far    far clipping plane
 * @return {void}
 */
p5.Matrix.prototype.perspective = function(fovy,aspect,near,far){

  var f = 1.0 / Math.tan(fovy / 2),
    nf = 1 / (near - far);

  this.mat4[0] = f / aspect;
  this.mat4[1] = 0;
  this.mat4[2] = 0;
  this.mat4[3] = 0;
  this.mat4[4] = 0;
  this.mat4[5] = f;
  this.mat4[6] = 0;
  this.mat4[7] = 0;
  this.mat4[8] = 0;
  this.mat4[9] = 0;
  this.mat4[10] = (far + near) * nf;
  this.mat4[11] = -1;
  this.mat4[12] = 0;
  this.mat4[13] = 0;
  this.mat4[14] = (2 * far * near) * nf;
  this.mat4[15] = 0;

  return this;

};

/**
 * sets the ortho matrix
 * @param  {Number} left   [description]
 * @param  {Number} right  [description]
 * @param  {Number} bottom [description]
 * @param  {Number} top    [description]
 * @param  {Number} near   near clipping plane
 * @param  {Number} far    far clipping plane
 * @return {void}
 */
p5.Matrix.prototype.ortho = function(left,right,bottom,top,near,far){

  var lr = 1 / (left - right),
    bt = 1 / (bottom - top),
    nf = 1 / (near - far);
  this.mat4[0] = -2 * lr;
  this.mat4[1] = 0;
  this.mat4[2] = 0;
  this.mat4[3] = 0;
  this.mat4[4] = 0;
  this.mat4[5] = -2 * bt;
  this.mat4[6] = 0;
  this.mat4[7] = 0;
  this.mat4[8] = 0;
  this.mat4[9] = 0;
  this.mat4[10] = 2 * nf;
  this.mat4[11] = 0;
  this.mat4[12] = (left + right) * lr;
  this.mat4[13] = (top + bottom) * bt;
  this.mat4[14] = (far + near) * nf;
  this.mat4[15] = 1;

  return this;
};

/**
 * PRIVATE
 */
// matrix methods adapted from:
// https://developer.mozilla.org/en-US/docs/Web/WebGL/
// gluPerspective
//
// function _makePerspective(fovy, aspect, znear, zfar){
//    var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
//    var ymin = -ymax;
//    var xmin = ymin * aspect;
//    var xmax = ymax * aspect;
//    return _makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
//  }

////
//// glFrustum
////
//function _makeFrustum(left, right, bottom, top, znear, zfar){
//  var X = 2*znear/(right-left);
//  var Y = 2*znear/(top-bottom);
//  var A = (right+left)/(right-left);
//  var B = (top+bottom)/(top-bottom);
//  var C = -(zfar+znear)/(zfar-znear);
//  var D = -2*zfar*znear/(zfar-znear);
//  var frustrumMatrix =[
//  X, 0, A, 0,
//  0, Y, B, 0,
//  0, 0, C, D,
//  0, 0, -1, 0
//];
//return frustrumMatrix;
// }

// function _setMVPMatrices(){
////an identity matrix
////@TODO use the p5.Matrix class to abstract away our MV matrices and
///other math
//var _mvMatrix =
//[
//  1.0,0.0,0.0,0.0,
//  0.0,1.0,0.0,0.0,
//  0.0,0.0,1.0,0.0,
//  0.0,0.0,0.0,1.0
//];

module.exports = p5.Matrix;
},{"../core/constants":47,"../core/core":48,"../math/polargeometry":77}],36:[function(_dereq_,module,exports){
'use strict';

var p5 = _dereq_('../core/core');
var shader = _dereq_('./shader');
_dereq_('../core/p5.Renderer');
_dereq_('./p5.Matrix');
var uMVMatrixStack = [];
var RESOLUTION = 1000;

//@TODO should probably implement an override for these attributes
var attributes = {
  alpha: false,
  depth: true,
  stencil: true,
  antialias: false,
  premultipliedAlpha: false,
  preserveDrawingBuffer: false
};

/**
 * 3D graphics class.  Can also be used as an off-screen graphics buffer.
 * A p5.Renderer3D object can be constructed
 *
 */
p5.Renderer3D = function(elt, pInst, isMainCanvas) {
  p5.Renderer.call(this, elt, pInst, isMainCanvas);

  try {
    this.drawingContext = this.canvas.getContext('webgl', attributes) ||
      this.canvas.getContext('experimental-webgl', attributes);
    if (this.drawingContext === null) {
      throw new Error('Error creating webgl context');
    } else {
      console.log('p5.Renderer3D: enabled webgl context');
    }
  } catch (er) {
    throw new Error(er);
  }

  this.isP3D = true; //lets us know we're in 3d mode
  this.GL = this.drawingContext;
  var gl = this.GL;
  gl.clearColor(1.0, 1.0, 1.0, 1.0); //background is initialized white
  gl.clearDepth(1);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  this._init();
  return this;
};

p5.Renderer3D.prototype = Object.create(p5.Renderer.prototype);

p5.Renderer3D.prototype._applyDefaults = function() {
  return this;
};

//////////////////////////////////////////////
// Setting
//////////////////////////////////////////////

p5.Renderer3D.prototype._init = function(first_argument) {
  var gl = this.GL;
  //for our default matrices
  this.initMatrix();
  this.initHash();
  //for immedidate mode
  this.verticeStack = [];
  this.verticeBuffer = gl.createBuffer();
  this.colorBuffer = gl.createBuffer();
  //for camera
  this._setCamera = false;
  //for counting lights
  this.ambientLightCount = 0;
  this.directionalLightCount = 0;
  this.pointLightCount = 0;
};

p5.Renderer3D.prototype._update = function() {
  this.resetMatrix();
  this.translate(0, 0, -800);
  this.ambientLightCount = 0;
  this.directionalLightCount = 0;
  this.pointLightCount = 0;
  this.verticeStack = [];
};

/**
 * [resize description]
 * @param  {[type]} w [description]
 * @param  {[tyoe]} h [description]
 * @return {[type]}   [description]
 */
p5.Renderer3D.prototype.resize = function(w,h) {
  var gl = this.GL;
  p5.Renderer.prototype.resize.call(this, w, h);
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
};

/**
 * [background description]
 * @return {[type]} [description]
 */
p5.Renderer3D.prototype.background = function() {
  var gl = this.GL;
  var _col = this._pInst.color.apply(this._pInst, arguments);
  // gl.clearColor(0.0,0.0,0.0,1.0);
  var _r = (_col.rgba[0]) / 255;
  var _g = (_col.rgba[1]) / 255;
  var _b = (_col.rgba[2]) / 255;
  var _a = (_col.rgba[3]) / 255;
  gl.clearColor(_r, _g, _b, _a);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};

//@TODO implement this
// p5.Renderer3D.prototype.clear = function() {
//@TODO
// };

//////////////////////////////////////////////
// SHADER
//////////////////////////////////////////////

/**
 * [initShaders description]
 * @param  {[type]} vertId [description]
 * @param  {[type]} fragId [description]
 * @return {[type]}        [description]
 */
p5.Renderer3D.prototype.initShaders = function(vertId, fragId, immediateMode) {
  var gl = this.GL;
  //set up our default shaders by:
  // 1. create the shader,
  // 2. load the shader source,
  // 3. compile the shader
  var _vertShader = gl.createShader(gl.VERTEX_SHADER);
  //load in our default vertex shader
  gl.shaderSource(_vertShader, shader[vertId]);
  gl.compileShader(_vertShader);
  // if our vertex shader failed compilation?
  if (!gl.getShaderParameter(_vertShader, gl.COMPILE_STATUS)) {
    alert('Yikes! An error occurred compiling the shaders:' +
      gl.getShaderInfoLog(_vertShader));
    return null;
  }

  var _fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  //load in our material frag shader
  gl.shaderSource(_fragShader, shader[fragId]);
  gl.compileShader(_fragShader);
  // if our frag shader failed compilation?
  if (!gl.getShaderParameter(_fragShader, gl.COMPILE_STATUS)) {
    alert('Darn! An error occurred compiling the shaders:' +
      gl.getShaderInfoLog(_fragShader));
    return null;
  }

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, _vertShader);
  gl.attachShader(shaderProgram, _fragShader);
  gl.linkProgram(shaderProgram);
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Snap! Error linking shader program');
  }
  //END SHADERS SETUP

  this._getLocation(shaderProgram, immediateMode);

  return shaderProgram;
};

p5.Renderer3D.prototype._getLocation = function(shaderProgram, immediateMode) {
  var gl = this.GL;
  gl.useProgram(shaderProgram);
  shaderProgram.uResolution =
    gl.getUniformLocation(shaderProgram, 'uResolution');
  gl.uniform1f(shaderProgram.uResolution, RESOLUTION);

  //vertex position Attribute
  shaderProgram.vertexPositionAttribute =
    gl.getAttribLocation(shaderProgram, 'aPosition');
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

  //projection Matrix uniform
  shaderProgram.uPMatrixUniform =
    gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
  //model view Matrix uniform
  shaderProgram.uMVMatrixUniform =
    gl.getUniformLocation(shaderProgram, 'uModelViewMatrix');

  //@TODO: figure out a better way instead of if statement
  if(immediateMode === undefined){
    //vertex normal Attribute
    shaderProgram.vertexNormalAttribute =
      gl.getAttribLocation(shaderProgram, 'aNormal');
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

    //normal Matrix uniform
    shaderProgram.uNMatrixUniform =
    gl.getUniformLocation(shaderProgram, 'uNormalMatrix');

    //texture coordinate Attribute
    shaderProgram.textureCoordAttribute =
      gl.getAttribLocation(shaderProgram, 'aTexCoord');
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

    shaderProgram.samplerUniform =
    gl.getUniformLocation(shaderProgram, 'uSampler');
  }
};

p5.Renderer3D.prototype.setMatrixUniforms = function(shaderKey) {
  var gl = this.GL;
  var shaderProgram = this.mHash[shaderKey];

  gl.useProgram(shaderProgram);

  gl.uniformMatrix4fv(
    shaderProgram.uPMatrixUniform,
    false, this.uPMatrix.mat4);

  gl.uniformMatrix4fv(
    shaderProgram.uMVMatrixUniform,
    false, this.uMVMatrix.mat4);

  this.uNMatrix = new p5.Matrix();
  this.uNMatrix.invert(this.uMVMatrix);
  this.uNMatrix.transpose(this.uNMatrix);

  gl.uniformMatrix4fv(
    shaderProgram.uNMatrixUniform,
    false, this.uNMatrix.mat4);
};

//////////////////////////////////////////////
// GET CURRENT | for shader and color
//////////////////////////////////////////////
p5.Renderer3D.prototype._getShader = function(vertId, fragId, immediateMode) {
  var mId = vertId+ '|' + fragId;
  //create it and put it into hashTable
  if(!this.materialInHash(mId)){
    var shaderProgram = this.initShaders(vertId, fragId, immediateMode);
    this.mHash[mId] = shaderProgram;
  }
  this.curShaderId = mId;

  return this.mHash[this.curShaderId];
};

p5.Renderer3D.prototype._getCurShaderId = function(){
  //if it's not defined yet
  if(this.curShaderId === undefined){
    //default shader: normalMaterial()
    var mId = 'normalVert|normalFrag';
    var shaderProgram = this.initShaders('normalVert', 'normalFrag');
    this.mHash[mId] = shaderProgram;
    this.curShaderId = mId;
  }

  return this.curShaderId;
};

p5.Renderer3D.prototype._getCurColor = function() {
  //default color: gray
  if(this.curColor === undefined) {
    this.curColor = [0.5, 0.5, 0.5, 1.0];
  }
  return this.curColor;
};

//////////////////////////////////////////////
// HASH | for material and geometry
//////////////////////////////////////////////

p5.Renderer3D.prototype.initHash = function(){
  this.gHash = {};
  this.mHash = {};
};

p5.Renderer3D.prototype.geometryInHash = function(gId){
  return this.gHash[gId] !== undefined;
};

p5.Renderer3D.prototype.materialInHash = function(mId){
  return this.mHash[mId] !== undefined;
};

//////////////////////////////////////////////
// MATRIX
//////////////////////////////////////////////

p5.Renderer3D.prototype.initMatrix = function(){
  this.uMVMatrix = new p5.Matrix();
  this.uPMatrix  = new p5.Matrix();
  this.uNMatrix = new p5.Matrix();
};

p5.Renderer3D.prototype.resetMatrix = function() {
  this.uMVMatrix = p5.Matrix.identity();
  //this.uPMatrix = p5.Matrix.identity();
};

//detect if user didn't set the camera
//then call this function below
p5.Renderer3D.prototype._setDefaultCamera = function(){
  if(!this._setCamera){
    var _w = this.width;
    var _h = this.height;
    this.uPMatrix = p5.Matrix.identity();
    this.uPMatrix.perspective(60 / 180 * Math.PI, _w / _h, 0.1, 100);
    this._setCamera = true;
  }
};

/**
 * [translate description]
 * @param  {[type]} x [description]
 * @param  {[type]} y [description]
 * @param  {[type]} z [description]
 * @return {[type]}   [description]
 * @todo implement handle for components or vector as args
 */
p5.Renderer3D.prototype.translate = function(x, y, z) {
  //@TODO: figure out how to fit the resolution
  x = x / RESOLUTION;
  y = -y / RESOLUTION;
  z = z / RESOLUTION;
  this.uMVMatrix.translate([x,y,z]);
  return this;
};

/**
 * Scales the Model View Matrix by a vector
 * @param  {Number | p5.Vector | Array} x [description]
 * @param  {Number} [y] y-axis scalar
 * @param  {Number} [z] z-axis scalar
 * @return {this}   [description]
 */
p5.Renderer3D.prototype.scale = function(x,y,z) {
  this.uMVMatrix.scale([x,y,z]);
  return this;
};

/**
 * [rotate description]
 * @param  {Number} rad  angle in radians
 * @param  {p5.Vector | Array} axis axis to rotate around
 * @return {p5.Renderer3D}      [description]
 */
p5.Renderer3D.prototype.rotate = function(rad, axis){
  this.uMVMatrix.rotate(rad, axis);
  return this;
};

/**
 * [rotateX description]
 * @param  {Number} rad radians to rotate
 * @return {[type]}     [description]
 */
p5.Renderer3D.prototype.rotateX = function(rad) {
  this.uMVMatrix.rotateX(rad);
  return this;
};

/**
 * [rotateY description]
 * @param  {Number} rad rad radians to rotate
 * @return {[type]}     [description]
 */
p5.Renderer3D.prototype.rotateY = function(rad) {
  this.uMVMatrix.rotateY(rad);
  return this;
};

/**
 * [rotateZ description]
 * @param  {Number} rad rad radians to rotate
 * @return {[type]}     [description]
 */
p5.Renderer3D.prototype.rotateZ = function(rad) {
  this.uMVMatrix.rotateZ(rad);
  return this;
};

/**
 * pushes a copy of the model view matrix onto the
 * MV Matrix stack.
 * NOTE to self: could probably make this more readable
 * @return {[type]} [description]
 */
p5.Renderer3D.prototype.push = function() {
  uMVMatrixStack.push(this.uMVMatrix.copy());
};

/**
 * [pop description]
 * @return {[type]} [description]
 */
p5.Renderer3D.prototype.pop = function() {
  if (uMVMatrixStack.length === 0) {
    throw new Error('Invalid popMatrix!');
  }
  this.uMVMatrix = uMVMatrixStack.pop();
};

module.exports = p5.Renderer3D;
},{"../core/core":48,"../core/p5.Renderer":54,"./p5.Matrix":35,"./shader":38}],37:[function(_dereq_,module,exports){
//retained mode is used by rendering 3d_primitives

'use strict';

var p5 = _dereq_('../core/core');
var hashCount = 0;

/**
 * createBuffer
 * @param  {String} gId [description]
 * @param  {String} obj [description]
 */
p5.Renderer3D.prototype.createBuffer = function(gId, obj) {

  hashCount ++;
  if(hashCount > 1000){
    var key = Object.keys(this.gHash)[0];
    delete this.gHash[key];
    hashCount --;
  }

  var gl = this.GL;
  this.gHash[gId] = {};
  this.gHash[gId].len = obj.len;
  this.gHash[gId].vertexBuffer = gl.createBuffer();
  this.gHash[gId].normalBuffer = gl.createBuffer();
  this.gHash[gId].uvBuffer = gl.createBuffer();
  this.gHash[gId].indexBuffer = gl.createBuffer();
};

/**
 * initBuffer description
 * @param  {String} gId    key of the geometry object
 * @param  {Object} obj    an object containing geometry information
 */
p5.Renderer3D.prototype.initBuffer = function(gId, obj) {
  this._setDefaultCamera();
  var gl = this.GL;
  this.createBuffer(gId, obj);

  var shaderProgram = this.mHash[this._getCurShaderId()];

  gl.bindBuffer(gl.ARRAY_BUFFER, this.gHash[gId].vertexBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER, new Float32Array(obj.vertices), gl.STATIC_DRAW);
  gl.vertexAttribPointer(
    shaderProgram.vertexPositionAttribute,
    3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.gHash[gId].normalBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER, new Float32Array(obj.vertexNormals), gl.STATIC_DRAW);
  gl.vertexAttribPointer(
    shaderProgram.vertexNormalAttribute,
    3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.gHash[gId].uvBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER, new Float32Array(obj.uvs), gl.STATIC_DRAW);
  gl.vertexAttribPointer(
    shaderProgram.textureCoordAttribute,
    2, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.gHash[gId].indexBuffer);
  gl.bufferData
   (gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(obj.faces), gl.STATIC_DRAW);
};

/**
 * drawBuffer
 * @param  {String} gId     key of the geometery object
 */
p5.Renderer3D.prototype.drawBuffer = function(gId) {
  this._setDefaultCamera();
  var gl = this.GL;
  var shaderKey = this._getCurShaderId();
  var shaderProgram = this.mHash[shaderKey];

  gl.bindBuffer(gl.ARRAY_BUFFER, this.gHash[gId].vertexBuffer);
  gl.vertexAttribPointer(
    shaderProgram.vertexPositionAttribute,
    3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.gHash[gId].normalBuffer);
  gl.vertexAttribPointer(
    shaderProgram.vertexNormalAttribute,
    3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.gHash[gId].uvBuffer);
  gl.vertexAttribPointer(
    shaderProgram.textureCoordAttribute,
    2, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.gHash[gId].indexBuffer);

  this.setMatrixUniforms(shaderKey);

  gl.drawElements(
    gl.TRIANGLES, this.gHash[gId].len,
     gl.UNSIGNED_SHORT, 0);
};

module.exports = p5.Renderer3D;
},{"../core/core":48}],38:[function(_dereq_,module,exports){


module.exports = {
  vertexColorVert:
    "attribute vec3 aPosition;\nattribute vec4 aVertexColor;\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform float uResolution;\n\nvarying vec4 vColor;\n\nvoid main(void) {\n  vec4 positionVec4 = vec4(aPosition / uResolution * vec3(1.0, -1.0, 1.0), 1.0);\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n  vColor = aVertexColor;\n}",
  vertexColorFrag:
    "precision mediump float;\nvarying vec4 vColor;\nvoid main(void) {\n  gl_FragColor = vColor;\n}",
  normalVert:
    "attribute vec3 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aTexCoord;\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform mat4 uNormalMatrix;\nuniform float uResolution;\n\nvarying vec3 vVertexNormal;\nvarying highp vec2 vVertTexCoord;\n\nvoid main(void) {\n  vec4 positionVec4 = vec4(aPosition / uResolution, 1.0);\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n  vVertexNormal = vec3( uNormalMatrix * vec4( aNormal, 1.0 ) );\n  vVertTexCoord = aTexCoord;\n}",
  normalFrag:
    "precision mediump float;\nvarying vec3 vVertexNormal;\nvoid main(void) {\n  gl_FragColor = vec4(vVertexNormal, 1.0);\n}",
  basicFrag:
    "precision mediump float;\nvarying vec3 vVertexNormal;\nuniform vec4 uMaterialColor;\nvoid main(void) {\n  gl_FragColor = uMaterialColor;\n}",
  lightVert:
    "attribute vec3 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aTexCoord;\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform mat4 uNormalMatrix;\nuniform float uResolution;\nuniform int uAmbientLightCount;\nuniform int uDirectionalLightCount;\nuniform int uPointLightCount;\n\nuniform vec3 uAmbientColor[8];\nuniform vec3 uLightingDirection[8];\nuniform vec3 uDirectionalColor[8];\nuniform vec3 uPointLightLocation[8];\nuniform vec3 uPointLightColor[8];\nuniform bool uSpecular;\n\nvarying vec3 vVertexNormal;\nvarying vec2 vVertTexCoord;\nvarying vec3 vLightWeighting;\n\nvec3 ambientLightFactor = vec3(0.0, 0.0, 0.0);\nvec3 directionalLightFactor = vec3(0.0, 0.0, 0.0);\nvec3 pointLightFactor = vec3(0.0, 0.0, 0.0);\nvec3 pointLightFactor2 = vec3(0.0, 0.0, 0.0);\n\nvoid main(void){\n\n  vec4 positionVec4 = vec4(aPosition / uResolution, 1.0);\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n\n  vec3 vertexNormal = vec3( uNormalMatrix * vec4( aNormal, 1.0 ) );\n  vVertexNormal = vertexNormal;\n  vVertTexCoord = aTexCoord;\n\n  vec4 mvPosition = uModelViewMatrix * vec4(aPosition / uResolution, 1.0);\n  vec3 eyeDirection = normalize(-mvPosition.xyz);\n\n  float shininess = 32.0;\n  float specularFactor = 2.0;\n  float diffuseFactor = 0.3;\n\n  for(int i = 0; i < 8; i++){\n    if(uAmbientLightCount == i) break;\n    ambientLightFactor += uAmbientColor[i];\n  }\n\n  for(int j = 0; j < 8; j++){\n    if(uDirectionalLightCount == j) break;\n    vec3 dir = uLightingDirection[j];\n    float directionalLightWeighting = max(dot(vertexNormal, dir), 0.0);\n    directionalLightFactor += uDirectionalColor[j] * directionalLightWeighting;\n  }\n\n  for(int k = 0; k < 8; k++){\n    if(uPointLightCount == k) break;\n    vec3 loc = uPointLightLocation[k];\n    //loc = loc / uResolution;\n    vec3 lightDirection = normalize(loc - mvPosition.xyz);\n\n    float directionalLightWeighting = max(dot(vertexNormal, lightDirection), 0.0);\n    pointLightFactor += uPointLightColor[k] * directionalLightWeighting;\n\n    //factor2 for specular\n    vec3 reflectionDirection = reflect(-lightDirection, vertexNormal);\n    float specularLightWeighting = pow(max(dot(reflectionDirection, eyeDirection), 0.0), shininess);\n\n    pointLightFactor2 += uPointLightColor[k] * (specularFactor * specularLightWeighting\n      +  directionalLightWeighting * diffuseFactor);\n  }\n  \n  if(!uSpecular){\n    vLightWeighting =  ambientLightFactor + directionalLightFactor + pointLightFactor;\n  }else{\n    vLightWeighting = ambientLightFactor + directionalLightFactor + pointLightFactor2;\n  }\n\n}",
  lightTextureFrag:
    "precision mediump float;\n\nuniform vec4 uMaterialColor;\nuniform sampler2D uSampler;\nuniform bool isTexture;\n\nvarying vec3 vLightWeighting;\nvarying highp vec2 vVertTexCoord;\n\nvoid main(void) {\n  if(!isTexture){\n    gl_FragColor = vec4(vec3(uMaterialColor.rgb * vLightWeighting), uMaterialColor.a);\n  }else{\n    vec4 textureColor = texture2D(uSampler, vec2(vVertTexCoord.s,vVertTexCoord.t));\n    if(vLightWeighting == vec3(0., 0., 0.)){\n      gl_FragColor = textureColor;\n    }else{\n      gl_FragColor = vec4(vec3(textureColor.rgb * vLightWeighting), textureColor.a); \n    }\n  }\n}"
};
},{}],39:[function(_dereq_,module,exports){

'use strict';

var p5 = _dereq_('./core/core');
_dereq_('./color/p5.Color');
_dereq_('./core/p5.Element');
_dereq_('./typography/p5.Font');
_dereq_('./core/p5.Graphics');
_dereq_('./core/p5.Renderer2D');

_dereq_('./image/p5.Image');
_dereq_('./math/p5.Vector');
_dereq_('./io/p5.TableRow');
_dereq_('./io/p5.Table');

_dereq_('./color/creating_reading');
_dereq_('./color/setting');
_dereq_('./core/constants');
_dereq_('./utilities/conversion');
_dereq_('./utilities/array_functions');
_dereq_('./utilities/string_functions');
_dereq_('./core/environment');
_dereq_('./image/image');
_dereq_('./image/loading_displaying');
_dereq_('./image/pixels');
_dereq_('./io/files');
_dereq_('./events/keyboard');
_dereq_('./events/acceleration'); //john
_dereq_('./events/mouse');
_dereq_('./utilities/time_date');
_dereq_('./events/touch');
_dereq_('./math/math');
_dereq_('./math/calculation');
_dereq_('./math/random');
_dereq_('./math/noise');
_dereq_('./math/trigonometry');
_dereq_('./core/rendering');
_dereq_('./core/2d_primitives');

_dereq_('./core/attributes');
_dereq_('./core/curves');
_dereq_('./core/vertex');
_dereq_('./core/structure');
_dereq_('./core/transform');
_dereq_('./typography/attributes');
_dereq_('./typography/loading_displaying');

_dereq_('./3d/p5.Renderer3D');
_dereq_('./3d/p5.Geometry3D');
_dereq_('./3d/retainedMode3D');
_dereq_('./3d/immediateMode3D');
_dereq_('./3d/3d_primitives');
_dereq_('./3d/p5.Matrix');
_dereq_('./3d/material');
_dereq_('./3d/light');
_dereq_('./3d/shader');
_dereq_('./3d/camera');
_dereq_('./3d/interaction');

/**
 * _globalInit
 *
 * TODO: ???
 * if sketch is on window
 * assume "global" mode
 * and instantiate p5 automatically
 * otherwise do nothing
 *
 * @return {Undefined}
 */
var _globalInit = function() {
  if (!window.PHANTOMJS && !window.mocha) {
    // If there is a setup or draw function on the window
    // then instantiate p5 in "global" mode
    if((window.setup && typeof window.setup === 'function') ||
      (window.draw && typeof window.draw === 'function')) {
      new p5();
    }
  }
};

// TODO: ???
if (document.readyState === 'complete') {
  _globalInit();
} else {
  window.addEventListener('load', _globalInit , false);
}

module.exports = p5;
},{"./3d/3d_primitives":28,"./3d/camera":29,"./3d/immediateMode3D":30,"./3d/interaction":31,"./3d/light":32,"./3d/material":33,"./3d/p5.Geometry3D":34,"./3d/p5.Matrix":35,"./3d/p5.Renderer3D":36,"./3d/retainedMode3D":37,"./3d/shader":38,"./color/creating_reading":41,"./color/p5.Color":42,"./color/setting":43,"./core/2d_primitives":44,"./core/attributes":45,"./core/constants":47,"./core/core":48,"./core/curves":49,"./core/environment":50,"./core/p5.Element":52,"./core/p5.Graphics":53,"./core/p5.Renderer2D":55,"./core/rendering":56,"./core/structure":58,"./core/transform":59,"./core/vertex":60,"./events/acceleration":61,"./events/keyboard":62,"./events/mouse":63,"./events/touch":64,"./image/image":66,"./image/loading_displaying":67,"./image/p5.Image":68,"./image/pixels":69,"./io/files":70,"./io/p5.Table":71,"./io/p5.TableRow":72,"./math/calculation":73,"./math/math":74,"./math/noise":75,"./math/p5.Vector":76,"./math/random":78,"./math/trigonometry":79,"./typography/attributes":80,"./typography/loading_displaying":81,"./typography/p5.Font":82,"./utilities/array_functions":83,"./utilities/conversion":84,"./utilities/string_functions":85,"./utilities/time_date":86}],40:[function(_dereq_,module,exports){
/**
 * module Utils
 * submodule Color Utils
 * @for p5
 */

var p5 = _dereq_('../core/core');

p5.ColorUtils = {};

/**
 * For a color expressed as an HSBA array, return the corresponding RGBA value
 * @param {Array} hsba An 'array' object that represents a list of HSB colors
 * @return {Array} an array of RGBA values, on a scale of 0-1
 */
p5.ColorUtils.hsbaToRGBA = function(hsba) {
  var h = hsba[0];
  var s = hsba[1];
  var v = hsba[2];
  var a = hsba[3] || 1;
  // Adapted from http://www.easyrgb.com/math.html
  // hsv values = 0 - 1, rgb values = 0 - 255
  var RGBA = [];
  if(s===0){
    RGBA = [v, v, v, a];
  } else {
    // h must be < 1
    var var_h = h * 6;
    if (var_h===6) {
      var_h = 0;
    }
    //Or ... var_i = floor( var_h )
    var var_i = Math.floor( var_h );
    var var_1 = v*(1-s);
    var var_2 = v*(1-s*(var_h-var_i));
    var var_3 = v*(1-s*(1-(var_h-var_i)));
    var r;
    var g;
    var b;
    if(var_i===0){
      r = v;
      g = var_3;
      b = var_1;
    }else if(var_i===1){
      r = var_2;
      g = v;
      b = var_1;
    }else if(var_i===2){
      r = var_1;
      g = v;
      b = var_3;
    }else if(var_i===3){
      r = var_1;
      g = var_2;
      b = v;
    }else if (var_i===4){
      r = var_3;
      g = var_1;
      b = v;
    }else{
      r = v;
      g = var_1;
      b = var_2;
    }
    RGBA = [r, g, b, a];
  }
  return RGBA;
};

/**
 * For a color expressed as an RGBA array, return the corresponding HSBA value
 *
 * @param {Array} rgba An 'array' object that represents a list of RGB colors
 * @return {Array} an array of HSB values
 */
p5.ColorUtils.rgbaToHSBA = function(rgba) {
  var r = rgba[0];
  var g = rgba[1];
  var b = rgba[2];
  var a = rgba[3] || 1;

  var min = Math.min(r, g, b); //Min. value of RGB
  var max = Math.max(r, g, b); //Max. value of RGB
  var delta_max = max - min;             //Delta RGB value

  var h;
  var s;
  var v = max;

  if (delta_max === 0) { //This is a gray, no chroma...
    h = 0; //HSV results from 0 to 1
    s = 0;
  }
  else { //Chromatic data...
    s = delta_max/max;

    var delta_r = ( ( ( max - r ) / 6 ) + ( delta_max / 2 ) ) / delta_max;
    var delta_g = ( ( ( max - g ) / 6 ) + ( delta_max / 2 ) ) / delta_max;
    var delta_b = ( ( ( max - b ) / 6 ) + ( delta_max / 2 ) ) / delta_max;

    if (r === max) {
      h = delta_b - delta_g;
    } else if (g === max) {
      h = 1/3 + delta_r - delta_b;
    } else if (b === max) {
      h = 2/3 + delta_g - delta_r;
    }

    if (h < 0) {
      h += 1;
    }
    if (h > 1) {
      h -= 1;
    }
  }
  return [h, s, v, a];
};

/**
 * For a color expressed as an HSLA array, return the corresponding RGBA value
 *
 * @param  {Array} hsla An 'array' object that represents a list of HSL colors
 * @return {Array} an array of RGBA values, on a scale of 0-1
 */
p5.ColorUtils.hslaToRGBA = function(hsla){
  var h = hsla[0];
  var s = hsla[1];
  var l = hsla[2];
  var a = hsla[3] || 1;

  // Adapted from http://www.easyrgb.com/math.html
  // hsl values = 0 - 1, rgb values = 0 - 1
  var rgba = [];
  if(s === 0){
    rgba = [l, l, l, a];
  } else {
    var m, n, r, g, b;

    n = l < 0.5 ? l * (1 + s) : (l + s) - (s * l);
    m = 2 * l - n;

    var convert = function(x, y, hue){
      if (hue < 0) {
        hue += 1;
      } else if (hue > 1) {
        hue -= 1;
      }

      if ( ( 6 * hue ) < 1 ) {
        return ( x + ( y - x ) * 6 * hue );
      } else if ( ( 2 * hue ) < 1 ) {
        return ( y );
      } else if ( ( 3 * hue ) < 2 ) {
        return ( x + ( y - x ) * ( ( 2 / 3 ) - hue ) * 6 );
      } else {
        return x;
      }
    };

    r = convert( m, n, h + ( 1 / 3 ) );
    g = convert( m, n, h );
    b = convert( m, n, h - ( 1 / 3 ) );

    rgba = [r, g, b, a];
  }

  return rgba;
};

/**
 * For a color expressed as an RGBA array, return the corresponding HSBA value
 *
 * @param {Array} rgba An 'array' object that represents a list of RGB colors
 * @return {Array} an array of HSL values
 */
p5.ColorUtils.rgbaToHSLA = function(rgba) {
  var r = rgba[0];
  var g = rgba[1];
  var b = rgba[2];
  var a = rgba[3] || 1;

  var min = Math.min(r, g, b); //Min. value of RGB
  var max = Math.max(r, g, b); //Max. value of RGB
  var delta_max = max - min;             //Delta RGB value

  var h;
  var s;
  var l = (max + min) / 2;

  var delta_r;
  var delta_g;
  var delta_b;

  if (delta_max === 0) { // This is a gray, no chroma...
    h = 0;             // HSL results from 0 to 1
    s = 0;
  } else {              // Chromatic data...

    delta_r = ( ( ( max - r ) / 6 ) + ( delta_max / 2 ) ) / delta_max;
    delta_g = ( ( ( max - g ) / 6 ) + ( delta_max / 2 ) ) / delta_max;
    delta_b = ( ( ( max - b ) / 6 ) + ( delta_max / 2 ) ) / delta_max;

    if ( r === max ){
      h = delta_b - delta_g;
    } else if ( g === max ){
      h = ( 1 / 3 ) + delta_r - delta_b;
    } else if ( b === max ) {
      h = ( 2 / 3 ) + delta_g - delta_r;
    }

    if ( h < 0 ) {
      h += 1;
    }

    if ( h > 1 ) {
      h -= 1;
    }

    if ( l < 0.5 ){
      s = delta_max / ( max + min );
    } else {
      s = delta_max / ( 2 - max - min );
    }

  }
  return [h, s, l, a];
};

/**
 * For a color expressed as an hsla array, return the corresponding HSBA value
 *
 * @param {Array} hsla An 'array' object that represents a list of HSLA colors
 * @return {Array} an array of HSBA values
 */
p5.ColorUtils.hslaToHSBA = function(hsla) {
  var h = hsla[0];
  var s = hsla[1];
  var l = hsla[2];
  var a = hsla[3] || 1;

  var v;

  //Hue and Alpha stay the same
  s *= l < 0.5 ? l : 1 - l;
  v = l + s;
  s = 2 * s / (l + s);

  return[ h, s, v, a];
};

/**
 * For a color expressed as an hsba array, return the corresponding HSLA value
 *
 * @param {Array} hsba An 'array' object that represents a list of HSBA colors
 * @return {Array} an array of HSLA values
 */
p5.ColorUtils.hsbaToHSLA = function(hsba) {
  var h = hsba[0];
  var s = hsba[1];
  var v = hsba[2];
  var a = hsba[3] || 1;

  //Hue and Alpha stay the same
  //Lightness is (2 - s) * v / 2
  var l = (2 - s) * v / 2;

  //Saturation is very different between the two color spaces
  //If l < 0.5 set it to s / (2 - s)
  //Otherwise s * v / (2 - (2 - s) * v)
  if( l !== 0 ){
    if( l === 1 ){
      s = 0;
    }
    else if( l < 0.5 ){
      s = s / (2 - s);
    }
    else{
      s = s * v / (2 - l * 2);
    }
  }

  return [ h, s, l, a];
};

module.exports = p5.ColorUtils;

},{"../core/core":48}],41:[function(_dereq_,module,exports){
/**
 * @module Color
 * @submodule Creating & Reading
 * @for p5
 * @requires core
 */

'use strict';

var p5 = _dereq_('../core/core');
var constants = _dereq_('../core/constants');
_dereq_('./p5.Color');

/**
 * Extracts the alpha value from a color or pixel array.
 *
 * @method alpha
 * @param {Object} obj p5.Color object or pixel array
 * @example
 * <div>
 * <code>
 * noStroke();
 * c = color(0, 126, 255, 102);
 * fill(c);
 * rect(15, 15, 35, 70);
 * value = alpha(c);  // Sets 'value' to 102
 * fill(value);
 * rect(50, 15, 35, 70);
 * </code>
 * </div>
 */
p5.prototype.alpha = function(c) {
  if (c instanceof p5.Color || c instanceof Array) {
    return this.color(c).getAlpha();
  } else {
    throw new Error('Needs p5.Color or pixel array as argument.');
  }
};

/**
 * Extracts the blue value from a color or a pixel array.
 *
 * @method blue
 * @param {Object} obj p5.Color object or pixel array
 * @example
 * <div>
 * <code>
 * c = color(175, 100, 220);  // Define color 'c'
 * fill(c);  // Use color variable 'c' as fill color
 * rect(15, 20, 35, 60);  // Draw left rectangle
 *
 * blueValue = blue(c);  // Get blue in 'c'
 * println(blueValue);  // Prints "220.0"
 * fill(0, 0, blueValue);  // Use 'blueValue' in new fill
 * rect(50, 20, 35, 60);  // Draw right rectangle
 * </code>
 * </div>
 */
p5.prototype.blue = function(c) {
  if (c instanceof p5.Color || c instanceof Array) {
    return this.color(c).getBlue();
  } else {
    throw new Error('Needs p5.Color or pixel array as argument.');
  }
};

/**
 * Extracts the brightness value from a color.
 *
 * @method brightness
 * @param {Object} color p5.Color object
 * @example
 * <div>
 * <code>
 * noStroke();
 * colorMode(HSB, 255);
 * c = color(0, 126, 255);
 * fill(c);
 * rect(15, 20, 35, 60);
 * value = brightness(c);  // Sets 'value' to 255
 * fill(value);
 * rect(50, 20, 35, 60);
 * </code>
 * </div>
 */
p5.prototype.brightness = function(c) {
  if (c instanceof p5.Color || c instanceof Array) {
    return this.color(c).getBrightness();
  } else {
    throw new Error('Needs p5.Color or pixel array as argument.');
  }
};

/**
 * Creates colors for storing in variables of the color datatype. The
 * parameters are interpreted as RGB or HSB values depending on the
 * current colorMode(). The default mode is RGB values from 0 to 255
 * and, therefore, the function call color(255, 204, 0) will return a
 * bright yellow color.
 *
 * Note that if only one value is provided to color(), it will be interpreted
 * as a grayscale value. Add a second value, and it will be used for alpha
 * transparency. When three values are specified, they are interpreted as
 * either RGB or HSB values. Adding a fourth value applies alpha
 * transparency. If a single string parameter is provided it will be
 * interpreted as a CSS-compatible color string.
 *
 * Colors are stored as Numbers or Arrays.
 *
 * @method color
 * @param  {Number|String} v1      gray value or red or hue value relative to
 *                                 the current color range, or a color string
 * @param  {Number}        [v2]    gray value or green or saturation value
 *                                 relative to the current color range (or
 *                                 alpha value if first param is gray value)
 * @param  {Number}        [v3]    gray value or blue or brightness value
 *                                 relative to the current color range
 * @param  {Number}        [alpha] alpha value relative to current color range
 * @return {Array}                 resulting color
 *
 * @example
 * <div>
 * <code>
 * var c = color(255, 204, 0);  // Define color 'c'
 * fill(c);  // Use color variable 'c' as fill color
 * noStroke();  // Don't draw a stroke around shapes
 * rect(30, 20, 55, 55);  // Draw rectangle
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * var c = color(255, 204, 0);  // Define color 'c'
 * fill(c);  // Use color variable 'c' as fill color
 * noStroke();  // Don't draw a stroke around shapes
 * ellipse(25, 25, 80, 80);  // Draw left circle
 *
 * // Using only one value with color()
 * // generates a grayscale value.
 * var c = color(65);  // Update 'c' with grayscale value
 * fill(c);  // Use updated 'c' as fill color
 * ellipse(75, 75, 80, 80);  // Draw right circle
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // Named SVG & CSS colors may be used,
 * var c = color('magenta');
 * fill(c);  // Use 'c' as fill color
 * noStroke();  // Don't draw a stroke around shapes
 * rect(20, 20, 60, 60);  // Draw rectangle
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // as can hex color codes:
 * noStroke();  // Don't draw a stroke around shapes
 * var c = color('#0f0');
 * fill(c);  // Use 'c' as fill color
 * rect(0, 10, 45, 80);  // Draw rectangle
 *
 * c = color('#00ff00');
 * fill(c);  // Use updated 'c' as fill color
 * rect(55, 10, 45, 80);  // Draw rectangle
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // RGB and RGBA color strings are also supported:
 * // these all set to the same color (solid blue)
 * var c;
 * noStroke();  // Don't draw a stroke around shapes
 * c = color('rgb(0,0,255)');
 * fill(c); // Use 'c' as fill color
 * rect(10, 10, 35, 35);  // Draw rectangle
 *
 * c = color('rgb(0%, 0%, 100%)');
 * fill(c); // Use updated 'c' as fill color
 * rect(55, 10, 35, 35);  // Draw rectangle
 *
 * c = color('rgba(0, 0, 255, 1)');
 * fill(c); // Use updated 'c' as fill color
 * rect(10, 55, 35, 35);  // Draw rectangle
 *
 * c = color('rgba(0%, 0%, 100%, 1)');
 * fill(c); // Use updated 'c' as fill color
 * rect(55, 55, 35, 35);  // Draw rectangle
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // HSL color is also supported and can be specified
 * // by value
 * var c;
 * noStroke();  // Don't draw a stroke around shapes
 * c = color('hsl(160, 100%, 50%)');
 * fill(c);  // Use 'c' as fill color
 * rect(0, 10, 45, 80);  // Draw rectangle
 *
 * c = color('hsla(160, 100%, 50%, 0.5)');
 * fill(c); // Use updated 'c' as fill color
 * rect(55, 10, 45, 80);  // Draw rectangle
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // HSB color is also supported and can be specified
 * // by value
 * var c;
 * noStroke();  // Don't draw a stroke around shapes
 * c = color('hsb(160, 100%, 50%)');
 * fill(c);  // Use 'c' as fill color
 * rect(0, 10, 45, 80);  // Draw rectangle
 *
 * c = color('hsba(160, 100%, 50%, 0.5)');
 * fill(c); // Use updated 'c' as fill color
 * rect(55, 10, 45, 80);  // Draw rectangle
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * var c;  // Declare color 'c'
 * noStroke();  // Don't draw a stroke around shapes
 *
 * // If no colorMode is specified, then the
 * // default of RGB with scale of 0-255 is used.
 * c = color(50, 55, 100);  // Create a color for 'c'
 * fill(c);  // Use color variable 'c' as fill color
 * rect(0, 10, 45, 80);  // Draw left rect
 *
 * colorMode(HSB, 100);  // Use HSB with scale of 0-100
 * c = color(50, 55, 100);  // Update 'c' with new color
 * fill(c);  // Use updated 'c' as fill color
 * rect(55, 10, 45, 80);  // Draw right rect
 * </code>
 * </div>
 */
p5.prototype.color = function() {
  var args = new Array(arguments.length);

  for (var i = 0; i < args.length; ++i) {
    args[i] = arguments[i];
  }

  if (args[0] instanceof p5.Color) {
    return args[0];
  } else if (args[0] instanceof Array) {
    return new p5.Color(this, args[0]);
  } else {
    return new p5.Color(this, args);
  }
};
/**
 * Extracts the green value from a color or pixel array.
 *
 * @method green
 * @param {Object} color p5.Color object
 * @example
 * <div>
 * <code>
 * c = color(20, 75, 200);  // Define color 'c'
 * fill(c);  // Use color variable 'c' as fill color
 * rect(15, 20, 35, 60);  // Draw left rectangle
 *
 * greenValue = green(c);  // Get green in 'c'
 * println(greenValue);  // Print "75.0"
 * fill(0, greenValue, 0);  // Use 'greenValue' in new fill
 * rect(50, 20, 35, 60);  // Draw right rectangle
 * </code>
 * </div>
 */
p5.prototype.green = function(c) {
  if (c instanceof p5.Color || c instanceof Array) {
    return this.color(c).getGreen();
  } else {
    throw new Error('Needs p5.Color or pixel array as argument.');
  }
};

/**
 * Extracts the hue value from a color.
 *
 * @method hue
 * @param {Object} color p5.Color object
 * @example
 * <div>
 * <code>
 * noStroke();
 * colorMode(HSB, 255);
 * c = color(0, 126, 255);
 * fill(c);
 * rect(15, 20, 35, 60);
 * value = hue(c);  // Sets 'value' to "0"
 * fill(value);
 * rect(50, 20, 35, 60);
 * </code>
 * </div>
 */
p5.prototype.hue = function(c) {
  if (!(c instanceof p5.Color)) {
    throw new Error('Needs p5.Color as argument.');
  }
  return c.getHue();
};

/**
 * Calculates a color or colors between two color at a specific increment,
 * using gamma correction to blend colors in the linear RGB space.
 * The amt parameter is the amount to interpolate between the two values
 * where 0.0 equal to the first point, 0.1 is very near the first point,
 * 0.5 is halfway in between, etc. An amount below 0 will be treated as 0.
 * Likewise, amounts above 1 will be capped at 1. This is different from
 * the behavior of lerp(), but necessary because otherwise numbers outside
 * the range will produce strange and unexpected colors.
 *
 * The regular RGB color representation stores the square root of the
 * displayed color, not the value itself. Your monitor behaves as if it
 * squares the color values before displaying it. lerpColor first transforms
 * colors into the linear color space before blending, to correctly mix the
 * colors as two rays of light.
 *
 * @method lerpColor
 * @param  {Array/Number} c1  interpolate from this color
 * @param  {Array/Number} c2  interpolate to this color
 * @param  {Number}       amt number between 0 and 1
 * @return {Array/Number}     interpolated color
 * @example
 * <div>
 * <code>
 * stroke(255);
 * background(51);
 * from = color(204, 102, 0);
 * to = color(0, 102, 153);
 * interA = lerpColor(from, to, .33);
 * interB = lerpColor(from, to, .66);
 * fill(from);
 * rect(10, 20, 20, 60);
 * fill(interA);
 * rect(30, 20, 20, 60);
 * fill(interB);
 * rect(50, 20, 20, 60);
 * fill(to);
 * rect(70, 20, 20, 60);
 * </code>
 * </div>
 */
p5.prototype.lerpColor = function(c1, c2, amt) {
  var l1, l2, l3, l4;
  var fromColor, toColor;

  if(this._renderer._colorMode === constants.RGB) {
    fromColor = this.color(c1).rgba;
    toColor = this.color(c2).rgba;
  }
  else if (this._renderer._colorMode === constants.HSB) {
    fromColor = this.color(c1).hsba;
    toColor = this.color(c2).hsba;
  }
  else if(this._renderer._colorMode === constants.HSL) {
    fromColor = this.color(c1).hsla;
    toColor = this.color(c2).hsla;
  }
  else {
    return;
  }
  l1 = this.lerp(fromColor[0], toColor[0], amt);
  l2 = this.lerp(fromColor[1], toColor[1], amt);
  l3 = this.lerp(fromColor[2], toColor[2], amt);
  l4 = this.lerp(fromColor[3], toColor[3], amt);
  return this.color(l1, l2, l3, l4);
};

/**
 * Extracts the lightness value from a color.
 *
 * @method lightness
 * @param {Object} color p5.Color object
 * @example
 * <div>
 * <code>
 * noStroke();
 * colorMode(HSL);
 * c = color(156, 100, 50, 1);
 * fill(c);
 * rect(15, 20, 35, 60);
 * value = lightness(c);  // Sets 'value' to 50
 * fill(value);
 * rect(50, 20, 35, 60);
 * </code>
 * </div>
 */

p5.prototype.lightness = function(c) {
  if (c instanceof p5.Color || c instanceof Array) {
    return this.color(c).getLightness();
  } else {
    throw new Error('Needs p5.Color or pixel array as argument.');
  }
};

/**
 * Extracts the red value from a color or pixel array.
 *
 * @method red
 * @param {Object} obj p5.Color object or pixel array
 * @example
 * <div>
 * <code>
 * c = color(255, 204, 0);  // Define color 'c'
 * fill(c);  // Use color variable 'c' as fill color
 * rect(15, 20, 35, 60);  // Draw left rectangle
 *
 * redValue = red(c);  // Get red in 'c'
 * println(redValue);  // Print "255.0"
 * fill(redValue, 0, 0);  // Use 'redValue' in new fill
 * rect(50, 20, 35, 60);  // Draw right rectangle
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * colorMode(RGB, 255);
 * var c = color(127, 255, 0);
 * colorMode(RGB, 1);
 * var myColor = red(c);
 * print(myColor);
 * </code>
 * </div>
 */
p5.prototype.red = function(c) {
  if (c instanceof p5.Color || c instanceof Array) {
    return this.color(c).getRed();
  } else {
    throw new Error('Needs p5.Color or pixel array as argument.');
  }
};

/**
 * Extracts the saturation value from a color.
 *
 * @method saturation
 * @param {Object} color p5.Color object
 * @example
 * <div>
 * <code>
 * noStroke();
 * colorMode(HSB, 255);
 * c = color(0, 126, 255);
 * fill(c);
 * rect(15, 20, 35, 60);
 * value = saturation(c);  // Sets 'value' to 126
 * fill(value);
 * rect(50, 20, 35, 60);
 * </code>
 * </div>
 */
p5.prototype.saturation = function(c) {
  if (!(c instanceof p5.Color)) {
    throw new Error('Needs p5.Color as argument.');
  }
  return c.getSaturation();
};



module.exports = p5;

},{"../core/constants":47,"../core/core":48,"./p5.Color":42}],42:[function(_dereq_,module,exports){
/**
 * @module Color
 * @submodule Creating & Reading
 * @for p5
 */

var p5 = _dereq_('../core/core');
var color_utils = _dereq_('./color_utils');
var constants = _dereq_('../core/constants');

/**
 *
 * @class p5.Color
 * @constructor
 * rgba, hsla, hsba are normalized rgba arrays
 * (1, 1, 1, 1)
 */
p5.Color = function (pInst, vals) {
  this.mode = pInst._renderer._colorMode;
  this.maxes = pInst._renderer._colorMaxes;
  var isHSB = this.mode === constants.HSB,
      isRGB = this.mode === constants.RGB,
      isHSL = this.mode === constants.HSL;

  if (isRGB) {
    this._array = p5.Color._getFormattedColor.apply(pInst, vals);
  } else if (isHSB) {
    this.hsba = p5.Color._getFormattedColor.apply(pInst, vals);
    this._array = color_utils.hsbaToRGBA(this.hsba);
  } else if (isHSL){
    this.hsla = p5.Color._getFormattedColor.apply(pInst, vals);
    this._array = color_utils.hslaToRGBA(this.hsla);
  } else {
    throw new Error(pInst._renderer._colorMode + ' is an invalid colorMode.');
  }

  this.rgba = [ Math.round(this._array[0] * 255),
                Math.round(this._array[1] * 255),
                Math.round(this._array[2] * 255),
                Math.round(this._array[3] * 255)];
  return this;
};

p5.Color.prototype.getHue = function() {
  // Hue is consistent in both HSL & HSB
  if (this.hsla) {
    return this.hsla[0] * this.maxes[constants.HSL][0];
  } else if (this.hsba) {
    return this.hsba[0] * this.maxes[constants.HSB][0];
  } else {
    this.hsla = color_utils.rgbaToHSLA(this._array);
    return this.hsla[0] * this.maxes[constants.HSL][0];
  }
};

p5.Color.prototype.getSaturation = function() {
  // Saturation exists in both HSB and HSL, but returns different values
  // We are preferring HSL here (because it is a web color space)
  // until the global flag issue can be resolved
  if (this.hsba && this.mode === constants.HSB) {
    return this.hsba[1] * this.maxes[constants.HSB][1];
  } else {
    if( !this.hsla ) {
      this.hsla = color_utils.rgbaToHSLA(this._array);
    }
    return this.hsla[1] * this.maxes[constants.HSL][1];
  }
};

// Brightness only exists as an HSB value
p5.Color.prototype.getBrightness = function() {
  if (this.hsba) {
    return this.hsba[2] * this.maxes[constants.HSB][2];
  } else {
    this.hsba = color_utils.rgbaToHSBA(this._array);
    return this.hsba[2] * this.maxes[constants.HSB][2];
  }
};

// Lightness only exists as an HSL value
p5.Color.prototype.getLightness = function() {
  if (this.hsla) {
    return this.hsla[2] * this.maxes[constants.HSL][2];
  } else {
    this.hsla = color_utils.rgbaToHSLA(this._array);
    return this.hsla[2] * this.maxes[constants.HSL][2];
  }
};

p5.Color.prototype.getRed = function() {
  return this._array[0] * this.maxes[constants.RGB][0];
};

p5.Color.prototype.getGreen = function() {
  return this._array[1] * this.maxes[constants.RGB][1];
};

p5.Color.prototype.getBlue = function() {
  return this._array[2] * this.maxes[constants.RGB][2];
};

p5.Color.prototype.getAlpha = function() {
  return this._array[3] * this.maxes[this.mode][3];
};

p5.Color.prototype.toString = function() {
  var a = this.rgba;
  a[3] = this._array[3];
  return 'rgba('+a[0]+','+a[1]+','+a[2]+','+ a[3] +')';
};

p5.Color.prototype._normalize = function(){
  var arr = this.rgba.map(function(value){
    return value / 255;
  });
  return arr;
};

/**
 * These Regular Expressions are used to build up the patterns for matching
 * viable CSS color strings: fragmenting the regexes in this way increases
 * the legibility and comprehensibility of the code
 */
// Match any number of whitespace characters (including no whitespace)
var WHITESPACE = /\s*/;
// Match whole-number values, e.g `255` or `79`
var INTEGER = /(\d{1,3})/;
// Match decimal values, e.g `129.6`, `79`, or `.9`
// Note: R, G or B values of `.9` are not parsed by IE: however, they are
// supported here to provide more consistent color string parsing
var DECIMAL = /((?:\d+(?:\.\d+)?)|(?:\.\d+))/;
// Match decimal values followed by a percent sign
var PERCENT = new RegExp(DECIMAL.source + '%');

var namedColors = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32'
};

// Regular Expressions for use identifying color pattern strings
var colorPatterns = {
  /**
   * Regular expression for matching colors in format #XXX,
   * e.g. #416
   */
  HEX3: /^#([a-f0-9])([a-f0-9])([a-f0-9])$/i,

  /**
   * Regular expression for matching colors in format #XXXXXX,
   * e.g. #b4d455
   */
  HEX6: /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i,

  /**
   * Regular expression for matching colors in format rgb(R, G, B),
   * e.g. rgb(255, 0, 128)
   */
  RGB: new RegExp([
    // Defining RegExp this way makes it more obvious where whitespace
    // (`\s*`) is permitted between tokens
    '^rgb\\(',
    INTEGER.source,
    ',',
    INTEGER.source,
    ',',
    INTEGER.source,
    '\\)$'
  ].join(WHITESPACE.source), 'i'),


  /**
   * Regular expression for matching colors in format rgb(R%, G%, B%),
   * e.g. rgb(100%, 0%, 28.9%)
   */
  RGB_PERCENT: new RegExp([
    // Defining RegExp this way makes it more obvious where whitespace
    // (`\s*`) is permitted between tokens
    '^rgb\\(',
    PERCENT.source,
    ',',
    PERCENT.source,
    ',',
    PERCENT.source,
    '\\)$'
  ].join(WHITESPACE.source), 'i'),

  /**
   * Regular expression for matching colors in format rgb(R, G, B, A),
   * e.g. rgb(255, 0, 128, 0.25)
   */
  RGBA: new RegExp([
    '^rgba\\(',
    INTEGER.source,
    ',',
    INTEGER.source,
    ',',
    INTEGER.source,
    ',',
    DECIMAL.source,
    '\\)$'
  ].join(WHITESPACE.source), 'i'),

  /**
   * Regular expression for matching colors in format rgb(R%, G%, B%, A),
   * e.g. rgb(100%, 0%, 28.9%. 0.5)
   */
  RGBA_PERCENT: new RegExp([
    '^rgba\\(',
    PERCENT.source,
    ',',
    PERCENT.source,
    ',',
    PERCENT.source,
    ',',
    DECIMAL.source,
    '\\)$'
  ].join(WHITESPACE.source), 'i'),

  /**
   * Regular expression for matching colors in format hsla(H, S%, L%),
   * e.g. hsl(100, 40%, 28.9%)
   */
  HSL: new RegExp([
    '^hsl\\(',
    INTEGER.source,
    ',',
    PERCENT.source,
    ',',
    PERCENT.source,
    '\\)$'
  ].join(WHITESPACE.source), 'i'),

  /**
   * Regular expression for matching colors in format hsla(H, S%, L%, A),
   * e.g. hsla(100, 40%, 28.9%, 0.5)
   */
  HSLA: new RegExp([
    '^hsla\\(',
    INTEGER.source,
    ',',
    PERCENT.source,
    ',',
    PERCENT.source,
    ',',
    DECIMAL.source,
    '\\)$'
  ].join(WHITESPACE.source), 'i'),

  /**
   * Regular expression for matching colors in format hsb(H, S%, B%),
   * e.g. hsb(100, 40%, 28.9%)
   */
  HSB: new RegExp([
    '^hsb\\(',
    INTEGER.source,
    ',',
    PERCENT.source,
    ',',
    PERCENT.source,
    '\\)$'
  ].join(WHITESPACE.source), 'i'),

  /**
   * Regular expression for matching colors in format hsba(H, S%, B%, A),
   * e.g. hsba(100, 40%, 28.9%, 0.5)
   */
  HSBA: new RegExp([
    '^hsba\\(',
    INTEGER.source,
    ',',
    PERCENT.source,
    ',',
    PERCENT.source,
    ',',
    DECIMAL.source,
    '\\)$'
  ].join(WHITESPACE.source), 'i')
};

/**
 * For a number of different inputs, returns a color formatted as
 * normalized [r, g, b, a], maxes [255, 255, 255, 255]
 *
 * @param {Array-like} args An 'array-like' object that represents a list of
 *                          arguments
 * @return {Array}          a color formatted as [r, g, b, a]
 *                          Example:
 *                          input        ==> output
 *                          g            ==> [g, g, g, 255]
 *                          g,a          ==> [g, g, g, a]
 *                          r, g, b      ==> [r, g, b, 255]
 *                          r, g, b, a   ==> [r, g, b, a]
 *                          [g]          ==> [g, g, g, 255]
 *                          [g, a]       ==> [g, g, g, a]
 *                          [r, g, b]    ==> [r, g, b, 255]
 *                          [r, g, b, a] ==> [r, g, b, a]
 * @example
 * <div>
 * <code>
 * // todo
 * </code>
 * </div>
 */
p5.Color._getFormattedColor = function () {
  var numArgs = arguments.length;
  var mode    = this._renderer._colorMode;
  var maxArr  = this._renderer._colorMaxes[this._renderer._colorMode];
  var results = [];

  // Handle [r,g,b,a] or [h,s,l,a] color values
  if (numArgs >= 3) {
    results[0] = arguments[0] / maxArr[0];
    results[1] = arguments[1] / maxArr[1];
    results[2] = arguments[2] / maxArr[2];
    results[3] = typeof arguments[3] === 'number' ?
              arguments[3] / maxArr[3] : 1;
  // Handle strings: named colors, hex values, css strings
  } else if (numArgs === 1 && typeof arguments[0] === 'string') {
    var str = arguments[0].trim().toLowerCase();

    if (namedColors[str]) {
      // Handle named color values
      return p5.Color._getFormattedColor.apply(this, [namedColors[str]]);
    }

    // Work through available string patterns to determine how to proceed
    if (colorPatterns.HEX3.test(str)) {
      results = colorPatterns.HEX3.exec(str).slice(1).map(function(color) {
        // Expand #RGB to #RRGGBB
        return parseInt(color + color, 16) / 255;
      });
      results[3] = 1;
    } else if (colorPatterns.HEX6.test(str)) {
      results = colorPatterns.HEX6.exec(str).slice(1).map(function(color) {
        return parseInt(color, 16) / 255;
      });
      results[3] = 1;
    } else if (colorPatterns.RGB.test(str)) {
      results = colorPatterns.RGB.exec(str).slice(1).map(function(color) {
        return color / 255;
      });
      results[3] = 1;
    } else if (colorPatterns.RGB_PERCENT.test(str)) {
      results = colorPatterns.RGB_PERCENT.exec(str).slice(1)
        .map(function(color) {
          return parseFloat(color) / 100;
        });
      results[3] = 1;
    } else if (colorPatterns.RGBA.test(str)) {
      results = colorPatterns.RGBA.exec(str).slice(1)
        .map(function(color, idx) {
          if (idx === 3) {
            return parseFloat(color);
          }
          return color / 255;
        });
    } else if (colorPatterns.RGBA_PERCENT.test(str)) {
      results = colorPatterns.RGBA_PERCENT.exec(str).slice(1)
        .map(function(color, idx) {
          if (idx === 3) {
            return parseFloat(color);
          }
          return parseFloat(color) / 100;
        });
    }
    // convert RGBA result to correct color space
    if( results.length ){
      if( mode === constants.RGB ){
        return results;
      }
      else if( mode === constants.HSL ){
        return color_utils.rgbaToHSLA(results);
      }
      else if( mode === constants.HSB ){
        return color_utils.rgbaToHSBA(results);
      }
    }

    // test string HSLA format
    if (colorPatterns.HSL.test(str)) {
      results = colorPatterns.HSL.exec(str).slice(1)
        .map(function(color, idx) {
        if( idx === 0 ) {
          return parseInt(color, 10) / 360;
        }
        return parseInt(color, 10) / 100;
      });
      results[3] = 1;
    } else if (colorPatterns.HSLA.test(str)) {
      results = colorPatterns.HSLA.exec(str).slice(1)
        .map(function(color, idx) {
        if( idx === 0 ){
          return parseInt(color, 10) / 360;
        }
        else if( idx === 3 ) {
          return parseFloat(color);
        }
        return parseInt(color, 10) / 100;
      });
    }
    // convert HSLA result to correct color space
    if( results.length ){
      if( mode === constants.RGB ){
        return color_utils.hslaToRGBA(results);
      }
      else if( mode === constants.HSL ){
        return results;
      }
      else if( mode === constants.HSB ){
        return color_utils.hslaToHSBA(results);
      }
    }

    // test string HSBA format
    if (colorPatterns.HSB.test(str)) {
      results = colorPatterns.HSB.exec(str).slice(1)
        .map(function(color, idx) {
        if( idx === 0 ) {
          return parseInt(color, 10) / 360;
        }
        return parseInt(color, 10) / 100;
      });
      results[3] = 1;
    } else if (colorPatterns.HSBA.test(str)) {
      results = colorPatterns.HSBA.exec(str).slice(1)
        .map(function(color, idx) {
        if( idx === 0 ){
          return parseInt(color, 10) / 360;
        }
        else if( idx === 3 ) {
          return parseFloat(color);
        }
        return parseInt(color, 10) / 100;
      });
    }
    // convert HSBA result to correct color space
    if( results.length ){
      if( mode === constants.RGB ){
        return color_utils.hsbaToRGBA(results);
      }
      else if( mode === constants.HSB ){
        return results;
      }
      else if( mode === constants.HSL ){
        return color_utils.hsbaToHSLA(results);
      }
    }

    // Input did not match any CSS Color pattern: Default to white
    results = [1, 1, 1, 1];
  } // Handle greyscale color mode
  else if((numArgs === 1 || numArgs === 2)&& typeof arguments[0] === 'number')
  {
    // When users pass only one argument, they are presumed to be
    // working in grayscale mode.
    if (mode === constants.RGB) {
      results[0] = arguments[0] / maxArr[0];
      results[1] = arguments[0] / maxArr[1];
      results[2] = arguments[0] / maxArr[2];
      results[3] = typeof arguments[1] === 'number' ?
                     arguments[1] / maxArr[3] : 1;
    } else {
      results[0] = arguments[0];
      results[1] = arguments[0];
      results[2] = arguments[0] / maxArr[2];
      results[3] = typeof arguments[1] === 'number' ?
                     arguments[1] / maxArr[3] : 1;
    }
  } else {
    throw new Error (arguments + 'is not a valid color representation.');
  }

  return results;
};

module.exports = p5.Color;

},{"../core/constants":47,"../core/core":48,"./color_utils":40}],43:[function(_dereq_,module,exports){
/**
 * @module Color
 * @submodule Setting
 * @for p5
 * @requires core
 * @requires constants
 */

'use strict';

var p5 = _dereq_('../core/core');
var constants = _dereq_('../core/constants');
_dereq_('./p5.Color');

/**
 * The background() function sets the color used for the background of the
 * p5.js canvas. The default background is light gray. This function is
 * typically used within draw() to clear the display window at the beginning
 * of each frame, but it can be used inside setup() to set the background on
 * the first frame of animation or if the background need only be set once.
 *
 * @method background
 * @param {Number|String|p5.Color|p5.Image} v1   gray value, red or hue value
 *                                               (depending on the current
 *                                               color mode), color string,
 *                                               p5.Color, or p5.Image
 * @param {Number}                          [v2] green or saturation value
 *                                               (depending on the current
 *                                               color mode)
 * @param {Number}                          [v3] blue or brightness value
 *                                               (depending on the current
 *                                               color mode)
 * @param {Number}                          [a]  opacity of the background
 *
 * @example
 * <div>
 * <code>
 * // Grayscale integer value
 * background(51);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // R, G & B integer values
 * background(255, 204, 0);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // H, S & B integer values
 * colorMode(HSB);
 * background(255, 204, 100);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // Named SVG/CSS color string
 * background('red');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // three-digit hexadecimal RGB notation
 * background('#fae');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // six-digit hexadecimal RGB notation
 * background('#222222');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // integer RGB notation
 * background('rgb(0,255,0)');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // integer RGBA notation
 * background('rgba(0,255,0, 0.25)');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // percentage RGB notation
 * background('rgb(100%,0%,10%)');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // percentage RGBA notation
 * background('rgba(100%,0%,100%,0.5)');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // p5 Color object
 * background(color(0, 0, 255));
 * </code>
 * </div>
 */
p5.prototype.background = function() {
  if (arguments[0] instanceof p5.Image) {
    this.image(arguments[0], 0, 0, this.width, this.height);
  } else {
    this._renderer.background.apply(this._renderer, arguments);
  }
  return this;
};

/**
 * Clears the pixels within a buffer. This function only works on p5.Canvas
 * objects created with the createCanvas() function; it won't work with the
 * main display window. Unlike the main graphics context, pixels in
 * additional graphics areas created with createGraphics() can be entirely
 * or partially transparent. This function clears everything to make all of
 * the pixels 100% transparent.
 *
 * @method clear
 * @example
 * <div>
 * <code>
 * </code>
 * </div>
 */
p5.prototype.clear = function() {
  this._renderer.clear();
  return this;
};

/**
 * Changes the way p5.js interprets color data. By default, the parameters
 * for fill(), stroke(), background(), and color() are defined by values
 * between 0 and 255 using the RGB color model. The colorMode() function is
 * used to switch color systems. Regardless of color system, all value ranges
 * are presumed to be 0–255 unless explicitly set otherwise. That is,
 * for a standard HSB range, one would pass colorMode(HSB, 360, 100, 100, 1).
 *
 * @method colorMode
 * @param {Number|Constant} mode either RGB or HSB, corresponding to
 *                               Red/Green/Blue and Hue/Saturation/Brightness
 * @param {Number|Constant} max1 range for the red or hue depending on the
 *                               current color mode, or range for all values
 * @param {Number|Constant} max2 range for the green or saturation depending
 *                               on the current color mode
 * @param {Number|Constant} max3 range for the blue or brightness depending
 *                               on the current color mode
 * @param {Number|Constant} maxA range for the alpha
 * @example
 * <div>
 * <code>
 * noStroke();
 * colorMode(RGB, 100);
 * for (i = 0; i < 100; i++) {
 *   for (j = 0; j < 100; j++) {
 *     stroke(i, j, 0);
 *     point(i, j);
 *   }
 * }
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * noStroke();
 * colorMode(HSB, 100);
 * for (i = 0; i < 100; i++) {
 *   for (j = 0; j < 100; j++) {
 *     stroke(i, j, 100);
 *     point(i, j);
 *   }
 * }
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * colorMode(RGB, 255);
 * var c = color(127, 255, 0);
 *
 * colorMode(RGB, 1);
 * var myColor = c.getRed();
 * text(myColor, 10, 10, 80, 80);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * noFill();
 * colorMode(RGB, 255, 255, 255, 1);
 * background(255);
 *
 * strokeWeight(4);
 * stroke(255, 0 , 10, 0.3);
 * ellipse(40, 40, 50, 50);
 * ellipse(50, 50, 40, 40);
 * </code>
 * </div>
 */
p5.prototype.colorMode = function() {
  if (arguments[0] === constants.RGB ||
      arguments[0] === constants.HSB ||
      arguments[0] === constants.HSL) {
    this._renderer._colorMode = arguments[0];

    var maxArr = this._renderer._colorMaxes[this._renderer._colorMode];

    if (arguments.length === 2) {
      maxArr[0] = arguments[1];
      maxArr[1] = arguments[1];
      maxArr[2] = arguments[1];
      maxArr[3] = arguments[1];
    } else if (arguments.length === 4) {
      maxArr[0] = arguments[1];
      maxArr[1] = arguments[2];
      maxArr[2] = arguments[3];
    }
    if (arguments.length === 5) {
      maxArr[0] = arguments[1];
      maxArr[1] = arguments[2];
      maxArr[2] = arguments[3];
      maxArr[3] = arguments[4];
    }
  }
  return this;
};

/**
 * Sets the color used to fill shapes. For example, if you run
 * fill(204, 102, 0), all subsequent shapes will be filled with orange. This
 * color is either specified in terms of the RGB or HSB color depending on
 * the current colorMode(). (The default color space is RGB, with each value
 * in the range from 0 to 255.) If a single string argument is provided, RGB,
 * RGBA and Hex CSS color strings and all named color strings are supported.
 * A p5 Color object can also be provided to set the fill color.
 *
 * @method fill
 * @param {Number|Array|String|p5.Color} v1   gray value, red or hue value
 *                                            (depending on the current color
 *                                            mode), or color Array, or CSS
 *                                            color string
 * @param {Number}                       [v2] green or saturation value
 *                                            (depending on the current
 *                                            color mode)
 * @param {Number}                       [v3] blue or brightness value
 *                                            (depending on the current
 *                                            color mode)
 * @param {Number}                       [a]  opacity of the background
 *
 * @example
 * <div>
 * <code>
 * // Grayscale integer value
 * fill(51);
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // R, G & B integer values
 * fill(255, 204, 0);
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // H, S & B integer values
 * colorMode(HSB);
 * fill(255, 204, 100);
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // Named SVG/CSS color string
 * fill('red');
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // three-digit hexadecimal RGB notation
 * fill('#fae');
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // six-digit hexadecimal RGB notation
 * fill('#222222');
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // integer RGB notation
 * fill('rgb(0,255,0)');
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // integer RGBA notation
 * fill('rgba(0,255,0, 0.25)');
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // percentage RGB notation
 * fill('rgb(100%,0%,10%)');
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // percentage RGBA notation
 * fill('rgba(100%,0%,100%,0.5)');
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // p5 Color object
 * fill(color(0, 0, 255));
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 */
p5.prototype.fill = function() {
  this._renderer._setProperty('_fillSet', true);
  this._renderer._setProperty('_doFill', true);
  this._renderer.fill.apply(this._renderer, arguments);
  return this;
};

/**
 * Disables filling geometry. If both noStroke() and noFill() are called,
 * nothing will be drawn to the screen.
 *
 * @method noFill
 * @example
 * <div>
 * <code>
 * rect(15, 10, 55, 55);
 * noFill();
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 */
p5.prototype.noFill = function() {
  this._renderer._setProperty('_doFill', false);
  return this;
};

/**
 * Disables drawing the stroke (outline). If both noStroke() and noFill()
 * are called, nothing will be drawn to the screen.
 *
 * @method noStroke
 * @example
 * <div>
 * <code>
 * noStroke();
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 */
p5.prototype.noStroke = function() {
  this._renderer._setProperty('_doStroke', false);
  return this;
};

/**
 * Sets the color used to draw lines and borders around shapes. This color
 * is either specified in terms of the RGB or HSB color depending on the
 * current colorMode() (the default color space is RGB, with each value in
 * the range from 0 to 255). If a single string argument is provided, RGB,
 * RGBA and Hex CSS color strings and all named color strings are supported.
 * A p5 Color object can also be provided to set the stroke color.
 *
 * @method stroke
 * @param {Number|Array|String|p5.Color} v1   gray value, red or hue value
 *                                            (depending on the current color
 *                                            mode), or color Array, or CSS
 *                                            color string
 * @param {Number}                       [v2] green or saturation value
 *                                            (depending on the current
 *                                            color mode)
 * @param {Number}                       [v3] blue or brightness value
 *                                            (depending on the current
 *                                            color mode)
 * @param {Number}                       [a]  opacity of the background
 *
 * @example
 * <div>
 * <code>
 * // Grayscale integer value
 * strokeWeight(4);
 * stroke(51);
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // R, G & B integer values
 * stroke(255, 204, 0);
 * strokeWeight(4);
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // H, S & B integer values
 * colorMode(HSB);
 * strokeWeight(4);
 * stroke(255, 204, 100);
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // Named SVG/CSS color string
 * stroke('red');
 * strokeWeight(4);
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // three-digit hexadecimal RGB notation
 * stroke('#fae');
 * strokeWeight(4);
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // six-digit hexadecimal RGB notation
 * stroke('#222222');
 * strokeWeight(4);
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // integer RGB notation
 * stroke('rgb(0,255,0)');
 * strokeWeight(4);
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // integer RGBA notation
 * stroke('rgba(0,255,0,0.25)');
 * strokeWeight(4);
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // percentage RGB notation
 * stroke('rgb(100%,0%,10%)');
 * strokeWeight(4);
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // percentage RGBA notation
 * stroke('rgba(100%,0%,100%,0.5)');
 * strokeWeight(4);
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * // p5 Color object
 * stroke(color(0, 0, 255));
 * strokeWeight(4);
 * rect(20, 20, 60, 60);
 * </code>
 * </div>
 */
p5.prototype.stroke = function() {
  this._renderer._setProperty('_strokeSet', true);
  this._renderer._setProperty('_doStroke', true);
  this._renderer.stroke.apply(this._renderer, arguments);
  return this;
};



module.exports = p5;

},{"../core/constants":47,"../core/core":48,"./p5.Color":42}],44:[function(_dereq_,module,exports){
/**
 * @module Shape
 * @submodule 2D Primitives
 * @for p5
 * @requires core
 * @requires constants
 */

'use strict';

var p5 = _dereq_('./core');
var constants = _dereq_('./constants');

_dereq_('./error_helpers');

/**
 * Draw an arc to the screen. If called with only a, b, c, d, start, and
 * stop, the arc will pe drawn as an open pie. If mode is provided, the arc
 * will be drawn either open, as a chord, or as a pie as specified. The
 * origin may be changed with the ellipseMode() function.<br><br>
 * Note that drawing a full circle (ex: 0 to TWO_PI) will appear blank
 * because 0 and TWO_PI are the same position on the unit circle. The
 * best way to handle this is by using the ellipse() function instead
 * to create a closed ellipse, and to use the arc() function
 * only to draw parts of an ellipse.
 *
 * @method arc
 * @param  {Number} a      x-coordinate of the arc's ellipse
 * @param  {Number} b      y-coordinate of the arc's ellipse
 * @param  {Number} c      width of the arc's ellipse by default
 * @param  {Number} d      height of the arc's ellipse by default
 * @param  {Number} start  angle to start the arc, specified in radians
 * @param  {Number} stop   angle to stop the arc, specified in radians
 * @param  {String} [mode] optional parameter to determine the way of drawing
 *                         the arc
 * @return {Object}        the p5 object
 * @example
 * <div>
 * <code>
 * arc(50, 55, 50, 50, 0, HALF_PI);
 * noFill();
 * arc(50, 55, 60, 60, HALF_PI, PI);
 * arc(50, 55, 70, 70, PI, PI+QUARTER_PI);
 * arc(50, 55, 80, 80, PI+QUARTER_PI, TWO_PI);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * arc(50, 50, 80, 80, 0, PI+QUARTER_PI, OPEN);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * arc(50, 50, 80, 80, 0, PI+QUARTER_PI, CHORD);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * arc(50, 50, 80, 80, 0, PI+QUARTER_PI, PIE);
 * </code>
 * </div>
 */
p5.prototype.arc = function(x, y, w, h, start, stop, mode) {
  var args = new Array(arguments.length);
  for (var i = 0; i < args.length; ++i) {
    args[i] = arguments[i];
  }
  this._validateParameters(
    'arc',
    args,
    [
      ['Number', 'Number', 'Number', 'Number', 'Number', 'Number'],
      [ 'Number', 'Number', 'Number', 'Number',
        'Number', 'Number', 'String' ]
    ]
  );

  if (!this._renderer._doStroke && !this._renderer._doFill) {
    return this;
  }
  if (this._angleMode === constants.DEGREES) {
    start = this.radians(start);
    stop = this.radians(stop);
  }

  // Make all angles positive...
  while (start < 0) {
    start += constants.TWO_PI;
  }
  while (stop < 0) {
    stop += constants.TWO_PI;
  }
  // ...and confine them to the interval [0,TWO_PI).
  start %= constants.TWO_PI;
  stop %= constants.TWO_PI;

  // Adjust angles to counter linear scaling.
  if (start <= constants.HALF_PI) {
    start = Math.atan(w / h * Math.tan(start));
  } else  if (start > constants.HALF_PI && start <= 3 * constants.HALF_PI) {
    start = Math.atan(w / h * Math.tan(start)) + constants.PI;
  } else {
    start = Math.atan(w / h * Math.tan(start)) + constants.TWO_PI;
  }
  if (stop <= constants.HALF_PI) {
    stop = Math.atan(w / h * Math.tan(stop));
  } else  if (stop > constants.HALF_PI && stop <= 3 * constants.HALF_PI) {
    stop = Math.atan(w / h * Math.tan(stop)) + constants.PI;
  } else {
    stop = Math.atan(w / h * Math.tan(stop)) + constants.TWO_PI;
  }

  // Exceed the interval if necessary in order to preserve the size and
  // orientation of the arc.
  if (start > stop) {
    stop += constants.TWO_PI;
  }
  // p5 supports negative width and heights for ellipses
  w = Math.abs(w);
  h = Math.abs(h);
  this._renderer.arc(x, y, w, h, start, stop, mode);
  return this;
};

/**
 * Draws an ellipse (oval) to the screen. An ellipse with equal width and
 * height is a circle. By default, the first two parameters set the location,
 * and the third and fourth parameters set the shape's width and height. The
 * origin may be changed with the ellipseMode() function.
 *
 * @method ellipse
 * @param  {Number} a x-coordinate of the ellipse.
 * @param  {Number} b y-coordinate of the ellipse.
 * @param  {Number} c width of the ellipse.
 * @param  {Number} d height of the ellipse.
 * @return {p5}       the p5 object
 * @example
 * <div>
 * <code>
 * ellipse(56, 46, 55, 55);
 * </code>
 * </div>
 */
p5.prototype.ellipse = function(x, y, w, h) {
  var args = new Array(arguments.length);
  for (var i = 0; i < args.length; ++i) {
    args[i] = arguments[i];
  }
  this._validateParameters(
    'ellipse',
    args,
    ['Number', 'Number', 'Number', 'Number']
  );

  if (!this._renderer._doStroke && !this._renderer._doFill) {
    return this;
  }
  // p5 supports negative width and heights for ellipses
  w = Math.abs(w);
  h = Math.abs(h);
  //@TODO add catch block here if this._renderer
  //doesn't have the method implemented yet
  this._renderer.ellipse(x, y, w, h);
  return this;
};
/**
 * Draws a line (a direct path between two points) to the screen. The version
 * of line() with four parameters draws the line in 2D. To color a line, use
 * the stroke() function. A line cannot be filled, therefore the fill()
 * function will not affect the color of a line. 2D lines are drawn with a
 * width of one pixel by default, but this can be changed with the
 * strokeWeight() function.
 *
 * @method line
 * @param  {Number} x1 the x-coordinate of the first point
 * @param  {Number} y1 the y-coordinate of the first point
 * @param  {Number} x2 the x-coordinate of the second point
 * @param  {Number} y2 the y-coordinate of the second point
 * @return {p5}        the p5 object
 * @example
 * <div>
 * <code>
 * line(30, 20, 85, 75);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * line(30, 20, 85, 20);
 * stroke(126);
 * line(85, 20, 85, 75);
 * stroke(255);
 * line(85, 75, 30, 75);
 * </code>
 * </div>
 */
////commented out original
// p5.prototype.line = function(x1, y1, x2, y2) {
//   if (!this._renderer._doStroke) {
//     return this;
//   }
//   if(this._renderer.isP3D){
//   } else {
//     this._renderer.line(x1, y1, x2, y2);
//   }
// };
p5.prototype.line = function() {
  if (!this._renderer._doStroke) {
    return this;
  }
  var args = new Array(arguments.length);
  for (var i = 0; i < args.length; ++i) {
    args[i] = arguments[i];
  }
  //check whether we should draw a 3d line or 2d
  if(this._renderer.isP3D){
    this._validateParameters(
      'line',
      args,
      [
        ['Number', 'Number', 'Number', 'Number', 'Number', 'Number']
      ]
    );
    this._renderer.line(
      args[0],
      args[1],
      args[2],
      args[3],
      args[4],
      args[5]);
  } else {
    this._validateParameters(
      'line',
      args,
      [
        ['Number', 'Number', 'Number', 'Number'],
      ]
    );
    this._renderer.line(
      args[0],
      args[1],
      args[2],
      args[3]);
  }
  return this;
};

/**
 * Draws a point, a coordinate in space at the dimension of one pixel.
 * The first parameter is the horizontal value for the point, the second
 * value is the vertical value for the point. The color of the point is
 * determined by the current stroke.
 *
 * @method point
 * @param  {Number} x the x-coordinate
 * @param  {Number} y the y-coordinate
 * @return {p5}       the p5 object
 * @example
 * <div>
 * <code>
 * point(30, 20);
 * point(85, 20);
 * point(85, 75);
 * point(30, 75);
 * </code>
 * </div>
 */
p5.prototype.point = function() {
  if (!this._renderer._doStroke) {
    return this;
  }
  var args = new Array(arguments.length);
  for (var i = 0; i < args.length; ++i) {
    args[i] = arguments[i];
  }
  //check whether we should draw a 3d line or 2d
  if(this._renderer.isP3D){
    this._validateParameters(
      'point',
      args,
      [
        ['Number', 'Number', 'Number']
      ]
    );
    this._renderer.point(
      args[0],
      args[1],
      args[2]
      );
  } else {
    this._validateParameters(
      'point',
      args,
      [
        ['Number', 'Number']
      ]
    );
    this._renderer.point(
      args[0],
      args[1]
    );
  }
  return this;
};


/**
 * Draw a quad. A quad is a quadrilateral, a four sided polygon. It is
 * similar to a rectangle, but the angles between its edges are not
 * constrained to ninety degrees. The first pair of parameters (x1,y1)
 * sets the first vertex and the subsequent pairs should proceed
 * clockwise or counter-clockwise around the defined shape.
 *
 * @method quad
 * @param {type} x1 the x-coordinate of the first point
 * @param {type} y1 the y-coordinate of the first point
 * @param {type} x2 the x-coordinate of the second point
 * @param {type} y2 the y-coordinate of the second point
 * @param {type} x3 the x-coordinate of the third point
 * @param {type} y3 the y-coordinate of the third point
 * @param {type} x4 the x-coordinate of the fourth point
 * @param {type} y4 the y-coordinate of the fourth point
 * @return {p5}     the p5 object
 * @example
 * <div>
 * <code>
 * quad(38, 31, 86, 20, 69, 63, 30, 76);
 * </code>
 * </div>
 */
p5.prototype.quad = function() {
  if (!this._renderer._doStroke && !this._renderer._doFill) {
    return this;
  }
  var args = new Array(arguments.length);
  for (var i = 0; i < args.length; ++i) {
    args[i] = arguments[i];
  }
  if(this._renderer.isP3D){
    this._validateParameters(
      'quad',
      args,
      [
        [ 'Number', 'Number', 'Number',
          'Number', 'Number', 'Number',
          'Number', 'Number', 'Number',
          'Number', 'Number', 'Number']
      ]
    );
    this._renderer.quad(
      args[0],
      args[1],
      args[2],
      args[3],
      args[4],
      args[5],
      args[6],
      args[7],
      args[8],
      args[9],
      args[10],
      args[11]
      );
  } else {
    this._validateParameters(
      'quad',
      args,
      [
        [ 'Number', 'Number', 'Number', 'Number',
          'Number', 'Number', 'Number', 'Number' ]
      ]
    );
    this._renderer.quad(
     args[0],
     args[1],
     args[2],
     args[3],
     args[4],
     args[5],
     args[6],
    args[7]
    );
  }
  return this;
};

/**
* Draws a rectangle to the screen. A rectangle is a four-sided shape with
* every angle at ninety degrees. By default, the first two parameters set
* the location of the upper-left corner, the third sets the width, and the
* fourth sets the height. The way these parameters are interpreted, however,
* may be changed with the rectMode() function. If provided, the fifth, sixth
* seventh and eighth parameters, if specified, determine corner radius for
* the top-right, top-left, lower-right and lower-left corners, respectively.
* An omitted corner radius parameter is set to the value of the previously
* specified radius value in the parameter list.
*
* @method rect
* @param  {Number} x  x-coordinate of the rectangle.
* @param  {Number} y  y-coordinate of the rectangle.
* @param  {Number} w  width of the rectangle.
* @param  {Number} h  height of the rectangle.
* @param  {Number} [tl] optional radius of top-left corner.
* @param  {Number} [tr] optional radius of top-right corner.
* @param  {Number} [br] optional radius of bottom-right corner.
* @param  {Number} [bl] optional radius of bottom-left corner.
* @return {p5}          the p5 object.
* @example
* <div>
* <code>
* // Draw a rectangle at location (30, 25) with a width and height of 55.
* rect(30, 20, 55, 55);
* </code>
* </div>
*
* <div>
* <code>
* // Draw a rectangle with rounded corners, each having a radius of 20.
* rect(30, 20, 55, 55, 20);
* </code>
* </div>
*
* <div>
* <code>
* // Draw a rectangle with rounded corners having the following radii:
* // top-left = 20, top-right = 15, bottom-right = 10, bottom-left = 5.
* rect(30, 20, 55, 55, 20, 15, 10, 5)
* </code>
* </div>
*/
p5.prototype.rect = function (x, y, w, h, tl, tr, br, bl) {
  var args = new Array(arguments.length);
  for (var i = 0; i < args.length; ++i) {
    args[i] = arguments[i];
  }
  this._validateParameters(
    'rect',
    args,
    [
      ['Number', 'Number', 'Number', 'Number'],
      ['Number', 'Number', 'Number', 'Number', 'Number'],
      ['Number', 'Number', 'Number', 'Number',
       'Number', 'Number', 'Number', 'Number']
    ]
  );

  if (!this._renderer._doStroke && !this._renderer._doFill) {
    return;
  }
  this._renderer.rect(x, y, w, h, tl, tr, br, bl);
  return this;
};

/**
* A triangle is a plane created by connecting three points. The first two
* arguments specify the first point, the middle two arguments specify the
* second point, and the last two arguments specify the third point.
*
* @method triangle
* @param  {Number} x1 x-coordinate of the first point
* @param  {Number} y1 y-coordinate of the first point
* @param  {Number} x2 x-coordinate of the second point
* @param  {Number} y2 y-coordinate of the second point
* @param  {Number} x3 x-coordinate of the third point
* @param  {Number} y3 y-coordinate of the third point
* @return {p5}        the p5 object
* @example
* <div>
* <code>
* triangle(30, 75, 58, 20, 86, 75);
* </code>
* </div>
*/
p5.prototype.triangle = function() {

  if (!this._renderer._doStroke && !this._renderer._doFill) {
    return this;
  }
  var args = new Array(arguments.length);
  for (var i = 0; i < args.length; ++i) {
    args[i] = arguments[i];
  }
  if(this._renderer.isP3D){
    this._validateParameters(
      'triangle',
      args,
      [
        ['Number', 'Number', 'Number', 'Number', 'Number', 'Number',
         'Number', 'Number', 'Number']
      ]
    );
    this._renderer.triangle(
      args[0],
      args[1],
      args[2],
      args[3],
      args[4],
      args[5],
      args[6],
      args[7],
      args[8]
      );
  } else {
    this._validateParameters(
      'triangle',
      args,
      [
        ['Number', 'Number', 'Number', 'Number', 'Number', 'Number']
      ]
    );
    this._renderer.triangle(
     args[0],
     args[1],
     args[2],
     args[3],
     args[4],
     args[5]
    );
  }
  return this;
};

module.exports = p5;

},{"./constants":47,"./core":48,"./error_helpers":51}],45:[function(_dereq_,module,exports){
/**
 * @module Shape
 * @submodule Attributes
 * @for p5
 * @requires core
 * @requires constants
 */

'use strict';

var p5 = _dereq_('./core');
var constants = _dereq_('./constants');

/**
 * Modifies the location from which ellipses are drawn by changing the way
 * in which parameters given to ellipse() are interpreted.
 *
 * The default mode is ellipseMode(CENTER), which interprets the first two
 * parameters of ellipse() as the shape's center point, while the third and
 * fourth parameters are its width and height.
 *
 * ellipseMode(RADIUS) also uses the first two parameters of ellipse() as
 * the shape's center point, but uses the third and fourth parameters to
 * specify half of the shapes's width and height.
 *
 * ellipseMode(CORNER) interprets the first two parameters of ellipse() as
 * the upper-left corner of the shape, while the third and fourth parameters
 * are its width and height.
 *
 * ellipseMode(CORNERS) interprets the first two parameters of ellipse() as
 * the location of one corner of the ellipse's bounding box, and the third
 * and fourth parameters as the location of the opposite corner.
 *
 * The parameter must be written in ALL CAPS because Processing is a
 * case-sensitive language.
 *
 * @method ellipseMode
 * @param  {Number/Constant} mode either CENTER, RADIUS, CORNER, or CORNERS
 * @return {p5}                   the p5 object
 * @example
 * <div>
 * <code>
 * ellipseMode(RADIUS);  // Set ellipseMode to RADIUS
 * fill(255);  // Set fill to white
 * ellipse(50, 50, 30, 30);  // Draw white ellipse using RADIUS mode
 *
 * ellipseMode(CENTER);  // Set ellipseMode to CENTER
 * fill(100);  // Set fill to gray
 * ellipse(50, 50, 30, 30);  // Draw gray ellipse using CENTER mode
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * ellipseMode(CORNER);  // Set ellipseMode is CORNER
 * fill(255);  // Set fill to white
 * ellipse(25, 25, 50, 50);  // Draw white ellipse using CORNER mode
 *
 * ellipseMode(CORNERS);  // Set ellipseMode to CORNERS
 * fill(100);  // Set fill to gray
 * ellipse(25, 25, 50, 50);  // Draw gray ellipse using CORNERS mode
 * </code>
 * </div>
 */
p5.prototype.ellipseMode = function(m) {
  if (m === constants.CORNER ||
    m === constants.CORNERS ||
    m === constants.RADIUS ||
    m === constants.CENTER) {
    this._renderer._ellipseMode = m;
  }
  return this;
};

/**
 * Draws all geometry with jagged (aliased) edges. Note that smooth() is
 * active by default, so it is necessary to call noSmooth() to disable
 * smoothing of geometry, images, and fonts.
 *
 * @method noSmooth
 * @return {p5} the p5 object
 * @example
 * <div>
 * <code>
 * background(0);
 * noStroke();
 * smooth();
 * ellipse(30, 48, 36, 36);
 * noSmooth();
 * ellipse(70, 48, 36, 36);
 * </code>
 * </div>
 */
p5.prototype.noSmooth = function() {
  this._renderer.noSmooth();
  return this;
};

/**
 * Modifies the location from which rectangles are drawn by changing the way
 * in which parameters given to rect() are interpreted.
 *
 * The default mode is rectMode(CORNER), which interprets the first two
 * parameters of rect() as the upper-left corner of the shape, while the
 * third and fourth parameters are its width and height.
 *
 * rectMode(CORNERS) interprets the first two parameters of rect() as the
 * location of one corner, and the third and fourth parameters as the
 * location of the opposite corner.
 *
 * rectMode(CENTER) interprets the first two parameters of rect() as the
 * shape's center point, while the third and fourth parameters are its
 * width and height.
 *
 * rectMode(RADIUS) also uses the first two parameters of rect() as the
 * shape's center point, but uses the third and fourth parameters to specify
 * half of the shapes's width and height.
 *
 * The parameter must be written in ALL CAPS because Processing is a
 * case-sensitive language.
 *
 * @method rectMode
 * @param  {Number/Constant} mode either CORNER, CORNERS, CENTER, or RADIUS
 * @return {p5}                   the p5 object
 * @example
 * <div>
 * <code>
 * rectMode(CORNER);  // Default rectMode is CORNER
 * fill(255);  // Set fill to white
 * rect(25, 25, 50, 50);  // Draw white rect using CORNER mode
 *
 * rectMode(CORNERS);  // Set rectMode to CORNERS
 * fill(100);  // Set fill to gray
 * rect(25, 25, 50, 50);  // Draw gray rect using CORNERS mode
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * rectMode(RADIUS);  // Set rectMode to RADIUS
 * fill(255);  // Set fill to white
 * rect(50, 50, 30, 30);  // Draw white rect using RADIUS mode
 *
 * rectMode(CENTER);  // Set rectMode to CENTER
 * fill(100);  // Set fill to gray
 * rect(50, 50, 30, 30);  // Draw gray rect using CENTER mode
 * </code>
 * </div>
 */
p5.prototype.rectMode = function(m) {
  if (m === constants.CORNER ||
    m === constants.CORNERS ||
    m === constants.RADIUS ||
    m === constants.CENTER) {
    this._renderer._rectMode = m;
  }
  return this;
};

/**
 * Draws all geometry with smooth (anti-aliased) edges. smooth() will also
 * improve image quality of resized images. Note that smooth() is active by
 * default; noSmooth() can be used to disable smoothing of geometry,
 * images, and fonts.
 *
 * @method smooth
 * @return {p5} the p5 object
 * @example
 * <div>
 * <code>
 * background(0);
 * noStroke();
 * smooth();
 * ellipse(30, 48, 36, 36);
 * noSmooth();
 * ellipse(70, 48, 36, 36);
 * </code>
 * </div>
 */
p5.prototype.smooth = function() {
  this._renderer.smooth();
  return this;
};

/**
 * Sets the style for rendering line endings. These ends are either squared,
 * extended, or rounded, each of which specified with the corresponding
 * parameters: SQUARE, PROJECT, and ROUND. The default cap is ROUND.
 *
 * @method strokeCap
 * @param  {Number/Constant} cap either SQUARE, PROJECT, or ROUND
 * @return {p5}                  the p5 object
 * @example
 * <div>
 * <code>
 * strokeWeight(12.0);
 * strokeCap(ROUND);
 * line(20, 30, 80, 30);
 * strokeCap(SQUARE);
 * line(20, 50, 80, 50);
 * strokeCap(PROJECT);
 * line(20, 70, 80, 70);
 * </code>
 * </div>
 */
p5.prototype.strokeCap = function(cap) {
  if (cap === constants.ROUND ||
    cap === constants.SQUARE ||
    cap === constants.PROJECT) {
    this._renderer.strokeCap(cap);
  }
  return this;
};

/**
 * Sets the style of the joints which connect line segments. These joints
 * are either mitered, beveled, or rounded and specified with the
 * corresponding parameters MITER, BEVEL, and ROUND. The default joint is
 * MITER.
 *
 * @method strokeJoin
 * @param  {Number/Constant} join either MITER, BEVEL, ROUND
 * @return {p5}                   the p5 object
 * @example
 * <div>
 * <code>
 * noFill();
 * strokeWeight(10.0);
 * strokeJoin(MITER);
 * beginShape();
 * vertex(35, 20);
 * vertex(65, 50);
 * vertex(35, 80);
 * endShape();
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * noFill();
 * strokeWeight(10.0);
 * strokeJoin(BEVEL);
 * beginShape();
 * vertex(35, 20);
 * vertex(65, 50);
 * vertex(35, 80);
 * endShape();
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * noFill();
 * strokeWeight(10.0);
 * strokeJoin(ROUND);
 * beginShape();
 * vertex(35, 20);
 * vertex(65, 50);
 * vertex(35, 80);
 * endShape();
 * </code>
 * </div>
 */
p5.prototype.strokeJoin = function(join) {
  if (join === constants.ROUND ||
    join === constants.BEVEL ||
    join === constants.MITER) {
    this._renderer.strokeJoin(join);
  }
  return this;
};

/**
 * Sets the width of the stroke used for lines, points, and the border
 * around shapes. All widths are set in units of pixels.
 *
 * @method strokeWeight
 * @param  {Number} weight the weight (in pixels) of the stroke
 * @return {p5}            the p5 object
 * @example
 * <div>
 * <code>
 * strokeWeight(1);  // Default
 * line(20, 20, 80, 20);
 * strokeWeight(4);  // Thicker
 * line(20, 40, 80, 40);
 * strokeWeight(10);  // Beastly
 * line(20, 70, 80, 70);
 * </code>
 * </div>
 */
p5.prototype.strokeWeight = function(w) {
  this._renderer.strokeWeight(w);
  return this;
};

module.exports = p5;

},{"./constants":47,"./core":48}],46:[function(_dereq_,module,exports){
/**
 * @requires constants
 */

var constants = _dereq_('./constants');

module.exports = {

  modeAdjust: function(a, b, c, d, mode) {
    if (mode === constants.CORNER) {
      return { x: a, y: b, w: c, h: d };
    } else if (mode === constants.CORNERS) {
      return { x: a, y: b, w: c-a, h: d-b };
    } else if (mode === constants.RADIUS) {
      return { x: a-c, y: b-d, w: 2*c, h: 2*d };
    } else if (mode === constants.CENTER) {
      return { x: a-c*0.5, y: b-d*0.5, w: c, h: d };
    }
  },

  arcModeAdjust: function(a, b, c, d, mode) {
    if (mode === constants.CORNER) {
      return { x: a+c*0.5, y: b+d*0.5, w: c, h: d };
    } else if (mode === constants.CORNERS) {
      return { x: a, y: b, w: c+a, h: d+b };
    } else if (mode === constants.RADIUS) {
      return { x: a, y: b, w: 2*c, h: 2*d };
    } else if (mode === constants.CENTER) {
      return { x: a, y: b, w: c, h: d };
    }
  }

};


},{"./constants":47}],47:[function(_dereq_,module,exports){
/**
 * @module Constants
 * @submodule Constants
 * @for p5
 */

var PI = Math.PI;

module.exports = {

  // GRAPHICS RENDERER
  P2D: 'p2d',
  WEBGL: 'webgl',

  // ENVIRONMENT
  ARROW: 'default',
  CROSS: 'crosshair',
  HAND: 'pointer',
  MOVE: 'move',
  TEXT: 'text',
  WAIT: 'wait',

  // TRIGONOMETRY

  /**
   * HALF_PI is a mathematical constant with the value
   * 1.57079632679489661923. It is half the ratio of the
   * circumference of a circle to its diameter. It is useful in
   * combination with the trigonometric functions sin() and cos().
   *
   * @property HALF_PI
   *
   * @example
   * <div><code>
   * arc(50, 50, 80, 80, 0, HALF_PI);
   * </code></div>
   *
   */
  HALF_PI: PI / 2,
  /**
   * PI is a mathematical constant with the value
   * 3.14159265358979323846. It is the ratio of the circumference
   * of a circle to its diameter. It is useful in combination with
   * the trigonometric functions sin() and cos().
   *
   * @property PI
   *
   * @example
   * <div><code>
   * arc(50, 50, 80, 80, 0, PI);
   * </code></div>
   */
  PI: PI,
  /**
   * QUARTER_PI is a mathematical constant with the value 0.7853982.
   * It is one quarter the ratio of the circumference of a circle to
   * its diameter. It is useful in combination with the trigonometric
   * functions sin() and cos().
   *
   * @property QUARTER_PI
   *
   * @example
   * <div><code>
   * arc(50, 50, 80, 80, 0, QUARTER_PI);
   * </code></div>
   *
   */
  QUARTER_PI: PI / 4,
  /**
   * TAU is an alias for TWO_PI, a mathematical constant with the
   * value 6.28318530717958647693. It is twice the ratio of the
   * circumference of a circle to its diameter. It is useful in
   * combination with the trigonometric functions sin() and cos().
   *
   * @property TAU
   *
   * @example
   * <div><code>
   * arc(50, 50, 80, 80, 0, TAU);
   * </code></div>
   *
   */
  TAU: PI * 2,
  /**
   * TWO_PI is a mathematical constant with the value
   * 6.28318530717958647693. It is twice the ratio of the
   * circumference of a circle to its diameter. It is useful in
   * combination with the trigonometric functions sin() and cos().
   *
   * @property TWO_PI
   *
   * @example
   * <div><code>
   * arc(50, 50, 80, 80, 0, TWO_PI);
   * </code></div>
   *
   */
  TWO_PI: PI * 2,
  DEGREES: 'degrees',
  RADIANS: 'radians',

  // SHAPE
  CORNER: 'corner',
  CORNERS: 'corners',
  RADIUS: 'radius',
  RIGHT: 'right',
  LEFT: 'left',
  CENTER: 'center',
  TOP: 'top',
  BOTTOM: 'bottom',
  BASELINE: 'alphabetic',
  POINTS: 'points',
  LINES: 'lines',
  TRIANGLES: 'triangles',
  TRIANGLE_FAN: 'triangles_fan',
  TRIANGLE_STRIP: 'triangles_strip',
  QUADS: 'quads',
  QUAD_STRIP: 'quad_strip',
  CLOSE: 'close',
  OPEN: 'open',
  CHORD: 'chord',
  PIE: 'pie',
  PROJECT: 'square', // PEND: careful this is counterintuitive
  SQUARE: 'butt',
  ROUND: 'round',
  BEVEL: 'bevel',
  MITER: 'miter',

  // COLOR
  RGB: 'rgb',
  HSB: 'hsb',
  HSL: 'hsl',

  // DOM EXTENSION
  AUTO: 'auto',

  // INPUT
  ALT: 18,
  BACKSPACE: 8,
  CONTROL: 17,
  DELETE: 46,
  DOWN_ARROW: 40,
  ENTER: 13,
  ESCAPE: 27,
  LEFT_ARROW: 37,
  OPTION: 18,
  RETURN: 13,
  RIGHT_ARROW: 39,
  SHIFT: 16,
  TAB: 9,
  UP_ARROW: 38,

  // RENDERING
  BLEND: 'normal',
  ADD: 'lighter',
  //ADD: 'add', //
  //SUBTRACT: 'subtract', //
  DARKEST: 'darken',
  LIGHTEST: 'lighten',
  DIFFERENCE: 'difference',
  EXCLUSION: 'exclusion',
  MULTIPLY: 'multiply',
  SCREEN: 'screen',
  REPLACE: 'source-over',
  OVERLAY: 'overlay',
  HARD_LIGHT: 'hard-light',
  SOFT_LIGHT: 'soft-light',
  DODGE: 'color-dodge',
  BURN: 'color-burn',

  // FILTERS
  THRESHOLD: 'threshold',
  GRAY: 'gray',
  OPAQUE: 'opaque',
  INVERT: 'invert',
  POSTERIZE: 'posterize',
  DILATE: 'dilate',
  ERODE: 'erode',
  BLUR: 'blur',

  // TYPOGRAPHY
  NORMAL: 'normal',
  ITALIC: 'italic',
  BOLD: 'bold',

  // TYPOGRAPHY-INTERNAL
  _DEFAULT_TEXT_FILL: '#000000',
  _DEFAULT_LEADMULT: 1.25,
  _CTX_MIDDLE: 'middle',

  // VERTICES
  LINEAR: 'linear',
  QUADRATIC: 'quadratic',
  BEZIER: 'bezier',
  CURVE: 'curve',

  // DEFAULTS
  _DEFAULT_STROKE: '#000000',
  _DEFAULT_FILL: '#FFFFFF'

};

},{}],48:[function(_dereq_,module,exports){
/**
 * @module Structure
 * @submodule Structure
 * @for p5
 * @requires constants
 */

'use strict';

_dereq_('./shim');

// Core needs the PVariables object
var constants = _dereq_('./constants');

/**
 * This is the p5 instance constructor.
 *
 * A p5 instance holds all the properties and methods related to
 * a p5 sketch.  It expects an incoming sketch closure and it can also
 * take an optional node parameter for attaching the generated p5 canvas
 * to a node.  The sketch closure takes the newly created p5 instance as
 * its sole argument and may optionally set preload(), setup(), and/or
 * draw() properties on it for running a sketch.
 *
 * A p5 sketch can run in "global" or "instance" mode:
 * "global"   - all properties and methods are attached to the window
 * "instance" - all properties and methods are bound to this p5 object
 *
 * @param  {Function}    sketch a closure that can set optional preload(),
 *                              setup(), and/or draw() properties on the
 *                              given p5 instance
 * @param  {HTMLElement|boolean} node element to attach canvas to, if a
 *                                    boolean is passed in use it as sync
 * @param  {boolean}     [sync] start synchronously (optional)
 * @return {p5}                 a p5 instance
 */
var p5 = function(sketch, node, sync) {

  if (arguments.length === 2 && typeof node === 'boolean') {
    sync = node;
    node = undefined;
  }

  //////////////////////////////////////////////
  // PUBLIC p5 PROPERTIES AND METHODS
  //////////////////////////////////////////////


  /**
   * Called directly before setup(), the preload() function is used to handle
   * asynchronous loading of external files. If a preload function is
   * defined, setup() will wait until any load calls within have finished.
   * Nothing besides load calls should be inside preload (loadImage,
   * loadJSON, loadFont, loadStrings, etc).
   *
   * @method preload
   * @example
   * <div><code>
   * var img;
   * var c;
   * function preload() {  // preload() runs once
   *   img = loadImage('assets/laDefense.jpg');
   * }
   *
   * function setup() {  // setup() waits until preload() is done
   *   img.loadPixels();
   *   // get color of middle pixel
   *   c = img.get(img.width/2, img.height/2);
   * }
   *
   * function draw() {
   *   background(c);
   *   image(img, 25, 25, 50, 50);
   * }
   * </code></div>
   */

  /**
   * The setup() function is called once when the program starts. It's used to
   * define initial environment properties such as screen size and background
   * color and to load media such as images and fonts as the program starts.
   * There can only be one setup() function for each program and it shouldn't
   * be called again after its initial execution. Note: Variables declared
   * within setup() are not accessible within other functions, including
   * draw().
   *
   * @method setup
   * @example
   * <div><code>
   * var a = 0;
   *
   * function setup() {
   *   background(0);
   *   noStroke();
   *   fill(102);
   * }
   *
   * function draw() {
   *   rect(a++%width, 10, 2, 80);
   * }
   * </code></div>
   */

  /**
   * Called directly after setup(), the draw() function continuously executes
   * the lines of code contained inside its block until the program is stopped
   * or noLoop() is called. draw() is called automatically and should never be
   * called explicitly.
   *
   * It should always be controlled with noLoop(), redraw() and loop(). After
   * noLoop() stops the code in draw() from executing, redraw() causes the
   * code inside draw() to execute once, and loop() will cause the code
   * inside draw() to resume executing continuously.
   *
   * The number of times draw() executes in each second may be controlled with
   * the frameRate() function.
   *
   * There can only be one draw() function for each sketch, and draw() must
   * exist if you want the code to run continuously, or to process events such
   * as mousePressed(). Sometimes, you might have an empty call to draw() in
   * your program, as shown in the above example.
   *
   * @method draw
   * @example
   * <div><code>
   * var yPos = 0;
   * function setup() {  // setup() runs once
   *   frameRate(30);
   * }
   * function draw() {  // draw() loops forever, until stopped
   *   background(204);
   *   yPos = yPos - 1;
   *   if (yPos < 0) {
   *     yPos = height;
   *   }
   *   line(0, yPos, width, yPos);
   * }
   * </code></div>
   */


  //////////////////////////////////////////////
  // PRIVATE p5 PROPERTIES AND METHODS
  //////////////////////////////////////////////

  this._setupDone = false;
  this.pixelDensity = window.devicePixelRatio || 1; // for handling hidpi
  this._userNode = node;
  this._curElement = null;
  this._elements = [];
  this._requestAnimId = 0;
  this._preloadCount = 0;
  this._isGlobal = false;
  this._loop = true;
  this._styles = [];
  this._defaultCanvasSize = {
    width: 100,
    height: 100
  };
  this._events = { // keep track of user-events for unregistering later
    'mousemove': null,
    'mousedown': null,
    'mouseup': null,
    'click': null,
    'mouseover': null,
    'mouseout': null,
    'keydown': null,
    'keyup': null,
    'keypress': null,
    'touchstart': null,
    'touchmove': null,
    'touchend': null,
    'resize': null,
    'blur': null
  };

  if (window.DeviceOrientationEvent) {
    this._events.deviceorientation = null;
  }
  if (window.DeviceMotionEvent && !window._isNodeWebkit) {
    this._events.devicemotion = null;
  }

  //FF doesn't recognize mousewheel as of FF3.x
  if (/Firefox/i.test(navigator.userAgent)) {
    this._events.DOMMouseScroll = null;
  } else {
    this._events.mousewheel = null;
  }


  this._loadingScreenId = 'p5_loading';

  this._start = function () {
    // Find node if id given
    if (this._userNode) {
      if (typeof this._userNode === 'string') {
        this._userNode = document.getElementById(this._userNode);
      }
    }

    // Always create a default canvas.
    // Later on if the user calls createCanvas, this default one
    // will be replaced
    this.createCanvas(
      this._defaultCanvasSize.width,
      this._defaultCanvasSize.height,
      'p2d',
      true
    );

    var userPreload = this.preload || window.preload; // look for "preload"
    if (userPreload) {

      // Setup loading screen
      // Set loading scfeen into dom if not present
      // Otherwise displays and removes user provided loading screen
      var loadingScreen = document.getElementById(this._loadingScreenId);
      if(!loadingScreen){
        loadingScreen = document.createElement('div');
        loadingScreen.innerHTML = 'Loading...';
        loadingScreen.style.position = 'absolute';
        loadingScreen.id = this._loadingScreenId;
        var node = this._userNode || document.body;
        node.appendChild(loadingScreen);
      }
      // var methods = this._preloadMethods;
      for (var method in this._preloadMethods){
        // default to p5 if no object defined
        this._preloadMethods[method] = this._preloadMethods[method] || p5;
        var obj = this._preloadMethods[method];
        //it's p5, check if it's global or instance
        if (obj === p5.prototype || obj === p5){
          obj = this._isGlobal ? window : this;
        }
        this._registeredPreloadMethods[method] = obj[method];
        obj[method] = this._wrapPreload(obj, method);
      }

      userPreload();
      this._runIfPreloadsAreDone();
    } else {
      this._setup();
      this._runFrames();
      this._draw();
    }
  }.bind(this);

  this._runIfPreloadsAreDone = function(){
    var context = this._isGlobal ? window : this;
    if (context._preloadCount === 0) {
      var loadingScreen = document.getElementById(context._loadingScreenId);
      if (loadingScreen) {
        loadingScreen.parentNode.removeChild(loadingScreen);
      }
      context._setup();
      context._runFrames();
      context._draw();
    }
  };

  this._decrementPreload = function(){
    var context = this._isGlobal ? window : this;
    context._setProperty('_preloadCount', context._preloadCount - 1);
    context._runIfPreloadsAreDone();
  };

  this._wrapPreload = function(obj, fnName){
    return function(){
      //increment counter
      this._incrementPreload();
      //call original function
      var args = Array.prototype.slice.call(arguments);
      args.push(this._decrementPreload.bind(this));
      return this._registeredPreloadMethods[fnName].apply(obj, args);
    }.bind(this);
  };

  this._incrementPreload = function(){
    var context = this._isGlobal ? window : this;
    context._setProperty('_preloadCount', context._preloadCount + 1);
  };

  this._setup = function() {

    // return preload functions to their normal vals if switched by preload
    var context = this._isGlobal ? window : this;
    if (typeof context.preload === 'function') {
      for (var f in this._preloadMethods) {
        context[f] = this._preloadMethods[f][f];
      }
    }

    // Short-circuit on this, in case someone used the library in "global"
    // mode earlier
    if (typeof context.setup === 'function') {
      context.setup();
    }

    // // unhide hidden canvas that was created
    // this.canvas.style.visibility = '';
    // this.canvas.className = this.canvas.className.replace('p5_hidden', '');

    // unhide any hidden canvases that were created
    var reg = new RegExp(/(^|\s)p5_hidden(?!\S)/g);
    var canvases = document.getElementsByClassName('p5_hidden');
    for (var i = 0; i < canvases.length; i++) {
      var k = canvases[i];
      k.style.visibility = '';
      k.className = k.className.replace(reg, '');
    }
    this._setupDone = true;

  }.bind(this);

  this._draw = function () {
    var now = window.performance.now();
    var time_since_last = now - this._lastFrameTime;
    var target_time_between_frames = 1000 / this._targetFrameRate;

    // only draw if we really need to; don't overextend the browser.
    // draw if we're within 5ms of when our next frame should paint
    // (this will prevent us from giving up opportunities to draw
    // again when it's really about time for us to do so). fixes an
    // issue where the frameRate is too low if our refresh loop isn't
    // in sync with the browser. note that we have to draw once even
    // if looping is off, so we bypass the time delay if that
    // is the case.
    var epsilon = 5;
    if (!this.loop ||
        time_since_last >= target_time_between_frames - epsilon) {
      this._setProperty('frameCount', this.frameCount + 1);
      this.redraw();
      this._updatePAccelerations();
      this._updatePRotations();
      this._updatePMouseCoords();
      this._updatePTouchCoords();
      this._frameRate = 1000.0/(now - this._lastFrameTime);
      this._lastFrameTime = now;
    }

    //mandatory update values(matrixs and stack) for 3d
    if(this._renderer.isP3D){
      this._renderer._update();
    }

    // get notified the next time the browser gives us
    // an opportunity to draw.
    if (this._loop) {
      this._requestAnimId = window.requestAnimationFrame(this._draw);
    }
  }.bind(this);

  this._runFrames = function() {
    if (this._updateInterval) {
      clearInterval(this._updateInterval);
    }
  }.bind(this);

  this._setProperty = function(prop, value) {
    this[prop] = value;
    if (this._isGlobal) {
      window[prop] = value;
    }
  }.bind(this);

  /**
   * Removes the entire p5 sketch. This will remove the canvas and any
   * elements created by p5.js. It will also stop the draw loop and unbind
   * any properties or methods from the window global scope. It will
   * leave a variable p5 in case you wanted to create a new p5 sketch.
   * If you like, you can set p5 = null to erase it.
   * @method remove
   * @example
   * <div class='norender'><code>
   * function draw() {
   *   ellipse(50, 50, 10, 10);
   * }
   *
   * function mousePressed() {
   *   remove(); // remove whole sketch on mouse press
   * }
   * </code></div>
   */
  this.remove = function() {
    if (this._curElement) {

      // stop draw
      this._loop = false;
      if (this._requestAnimId) {
        window.cancelAnimationFrame(this._requestAnimId);
      }

      // unregister events sketch-wide
      for (var ev in this._events) {
        window.removeEventListener(ev, this._events[ev]);
      }

      // remove DOM elements created by p5, and listeners
      for (var i=0; i<this._elements.length; i++) {
        var e = this._elements[i];
        if (e.elt.parentNode) {
          e.elt.parentNode.removeChild(e.elt);
        }
        for (var elt_ev in e._events) {
          e.elt.removeEventListener(elt_ev, e._events[elt_ev]);
        }
      }

      // call any registered remove functions
      var self = this;
      this._registeredMethods.remove.forEach(function (f) {
        if (typeof(f) !== 'undefined') {
          f.call(self);
        }
      });

      // remove window bound properties and methods
      if (this._isGlobal) {
        for (var p in p5.prototype) {
          try {
            delete window[p];
          } catch (x) {
            window[p] = undefined;
          }
        }
        for (var p2 in this) {
          if (this.hasOwnProperty(p2)) {
            try {
              delete window[p2];
            } catch (x) {
              window[p2] = undefined;
            }
          }
        }
      }
    }
    // window.p5 = undefined;
  }.bind(this);


  // attach constants to p5 instance
  for (var k in constants) {
    p5.prototype[k] = constants[k];
  }

  // If the user has created a global setup or draw function,
  // assume "global" mode and make everything global (i.e. on the window)
  if (!sketch) {
    this._isGlobal = true;
    // Loop through methods on the prototype and attach them to the window
    for (var p in p5.prototype) {
      if(typeof p5.prototype[p] === 'function') {
        var ev = p.substring(2);
        if (!this._events.hasOwnProperty(ev)) {
          window[p] = p5.prototype[p].bind(this);
        }
      } else {
        window[p] = p5.prototype[p];
      }
    }
    // Attach its properties to the window
    for (var p2 in this) {
      if (this.hasOwnProperty(p2)) {
        window[p2] = this[p2];
      }
    }

  } else {
    // Else, the user has passed in a sketch closure that may set
    // user-provided 'setup', 'draw', etc. properties on this instance of p5
    sketch(this);
  }

  // Bind events to window (not using container div bc key events don't work)

  for (var e in this._events) {
    var f = this['_on'+e];
    if (f) {
      var m = f.bind(this);
      window.addEventListener(e, m);
      this._events[e] = m;
    }
  }

  var focusHandler = function() {
    this._setProperty('focused', true);
  }.bind(this);
  var blurHandler = function() {
    this._setProperty('focused', false);
  }.bind(this);
  window.addEventListener('focus', focusHandler);
  window.addEventListener('blur', blurHandler);
  this.registerMethod('remove', function() {
    window.removeEventListener(focusHandler);
    window.removeEventListener(blurHandler);
  });

  // TODO: ???

  if (sync) {
    this._start();
  } else {
    if (document.readyState === 'complete') {
      this._start();
    } else {
      window.addEventListener('load', this._start.bind(this), false);
    }
  }
};


// functions that cause preload to wait
// more can be added by using registerPreloadMethod(func)
p5.prototype._preloadMethods = {
  loadJSON: p5.prototype,
  loadImage: p5.prototype,
  loadStrings: p5.prototype,
  loadXML: p5.prototype,
  loadShape: p5.prototype,
  loadTable: p5.prototype,
  loadFont: p5.prototype
};

p5.prototype._registeredMethods = { pre: [], post: [], remove: [] };

p5.prototype._registeredPreloadMethods = {};

p5.prototype.registerPreloadMethod = function(fnString, obj) {
  // obj = obj || p5.prototype;
  if (!p5.prototype._preloadMethods.hasOwnProperty(fnString)) {
    p5.prototype._preloadMethods[fnString] = obj;
  }
};

p5.prototype.registerMethod = function(name, m) {
  if (!p5.prototype._registeredMethods.hasOwnProperty(name)) {
    p5.prototype._registeredMethods[name] = [];
  }
  p5.prototype._registeredMethods[name].push(m);
};

module.exports = p5;

},{"./constants":47,"./shim":57}],49:[function(_dereq_,module,exports){

},{"./core":48,"./error_helpers":51}],50:[function(_dereq_,module,exports){
/**
 * @module Environment
 * @submodule Environment
 * @for p5
 * @requires core
 * @requires constants
 */

'use strict';

var p5 = _dereq_('./core');
var C = _dereq_('./constants');

var standardCursors = [C.ARROW, C.CROSS, C.HAND, C.MOVE, C.TEXT, C.WAIT];

p5.prototype._frameRate = 0;
p5.prototype._lastFrameTime = window.performance.now();
p5.prototype._targetFrameRate = 60;


if (window.console && console.log) {
  /**
   * The print() function writes to the console area of your browser.
   * This function is often helpful for looking at the data a program is
   * producing. This function creates a new line of text for each call to
   * the function. Individual elements can be
   * separated with quotes ("") and joined with the addition operator (+).
   *
   * While print() is similar to console.log(), it does not directly map to
   * it in order to simulate easier to understand behavior than
   * console.log(). Due to this, it is slower. For fastest results, use
   * console.log().
   *
   * @method print
   * @param {Any} contents any combination of Number, String, Object, Boolean,
   *                       Array to print
   * @example
   * <div><code class='norender'>
   * var x = 10;
   * print("The value of x is "+x);
   * // prints "The value of x is 10"
   * </code></div>
   */
  // Converts passed args into a string and then parses that string to
  // simulate synchronous behavior. This is a hack and is gross.
  // Since this will not work on all objects, particularly circular
  // structures, simply console.log() on error.
  p5.prototype.print = function(args) {
    try {
      var newArgs = JSON.parse(JSON.stringify(args));
      console.log(newArgs);
    } catch(err) {
      console.log(args);
    }
  };
} else {
  p5.prototype.print = function() {};
}

p5.prototype.println = p5.prototype.print;

/**
 * The system variable frameCount contains the number of frames that have
 * been displayed since the program started. Inside setup() the value is 0,
 * after the first iteration of draw it is 1, etc.
 *
 * @property frameCount
 * @example
 *   <div><code>
 *     function setup() {
 *       frameRate(30);
 *       textSize(20);
 *       textSize(30);
 *       textAlign(CENTER);
 *     }
 *
 *     function draw() {
 *       background(200);
 *       text(frameCount, width/2, height/2);
 *     }
 *   </code></div>
 */
p5.prototype.frameCount = 0;

/**
 * Confirms if the window a p5.js program is in is "focused," meaning that
 * the sketch will accept mouse or keyboard input. This variable is
 * "true" if the window is focused and "false" if not.
 *
 * @property focused
 * @example
 * <div><code>
 * // To demonstrate, put two windows side by side.
 * // Click on the window that the p5 sketch isn't in!
 * function draw() {
 *   if (focused) {  // or "if (focused === true)"
 *     noStroke();
 *     fill(0, 200, 0);
 *     ellipse(25, 25, 50, 50);
 *   } else {
 *     stroke(200,0,0);
 *     line(0, 0, 100, 100);
 *     line(100, 0, 0, 100);
 *   }
 * }
 *
 * </code></div>
 */
p5.prototype.focused = (document.hasFocus());

/**
 * Sets the cursor to a predefined symbol or an image, or makes it visible
 * if already hidden. If you are trying to set an image as the cursor, the
 * recommended size is 16x16 or 32x32 pixels. It is not possible to load an
 * image as the cursor if you are exporting your program for the Web, and not
 * all MODES work with all browsers. The values for parameters x and y must
 * be less than the dimensions of the image.
 *
 * @method cursor
 * @param {Number/Constant} type either ARROW, CROSS, HAND, MOVE, TEXT, or
 *                               WAIT, or path for image
 * @param {Number}          [x]  the horizontal active spot of the cursor
 * @param {Number}          [y]  the vertical active spot of the cursor
 * @example
 * <div><code>
 * // Move the mouse left and right across the image
 * // to see the cursor change from a cross to a hand
 * function draw() {
 *   line(width/2, 0, width/2, height);
 *   if (mouseX < 50) {
 *     cursor(CROSS);
 *   } else {
 *     cursor(HAND);
 *   }
 * }
 * </code></div>
 */
p5.prototype.cursor = function(type, x, y) {
  var cursor = 'auto';
  var canvas = this._curElement.elt;
  if (standardCursors.indexOf(type) > -1) {
    // Standard css cursor
    cursor = type;
  } else if (typeof type === 'string') {
    var coords = '';
    if (x && y && (typeof x === 'number' && typeof y === 'number')) {
      // Note that x and y values must be unit-less positive integers < 32
      // https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
      coords = x + ' ' + y;
    }
    if (type.substring(0, 6) !== 'http://') {
      // Image (absolute url)
      cursor = 'url(' + type + ') ' + coords + ', auto';
    } else if (/\.(cur|jpg|jpeg|gif|png|CUR|JPG|JPEG|GIF|PNG)$/.test(type)) {
      // Image file (relative path) - Separated for performance reasons
      cursor = 'url(' + type + ') ' + coords + ', auto';
    } else {
      // Any valid string for the css cursor property
      cursor = type;
    }
  }
  canvas.style.cursor = cursor;
};

/**
 * Specifies the number of frames to be displayed every second. For example,
 * the function call frameRate(30) will attempt to refresh 30 times a second.
 * If the processor is not fast enough to maintain the specified rate, the
 * frame rate will not be achieved. Setting the frame rate within setup() is
 * recommended. The default rate is 60 frames per second. This is the same as
 * setFrameRate(val).
 *
 * Calling frameRate() with no arguments returns the current framerate. This
 * is the same as getFrameRate().
 *
 * @method frameRate
 * @param  {Number} [fps] number of frames to be displayed every second
 * @return {Number}       current frameRate
 * @example
 *
 * <div><code>
 * var rectX = 0;
 * var fr = 30; //starting FPS
 * var clr = color(255,0,0);
 *
 * function setup() {
 *   background(200);
 *   frameRate(fr); // Attempt to refresh at starting FPS
 * }
 *
 * function draw() {
 *   background(200);
 *   rectX = rectX += 1; // Move Rectangle
 *
 *   if (rectX >= width) { // If you go off screen.
 *     if (fr == 30) {
 *       clr = color(0,0,255);
 *       fr = 10;
 *       frameRate(fr); // make frameRate 10 FPS
 *     } else {
 *       clr = color(255,0,0);
 *       fr = 30;
 *       frameRate(fr); // make frameRate 30 FPS
 *     }
 *     rectX = 0;
 *   }
 *   fill(clr);
 *   rect(rectX, 40, 20,20);
 * }
 * </div></code>
 *
 */
p5.prototype.frameRate = function(fps) {
  if (typeof fps === 'undefined') {
    return this._frameRate;
  } else {
    this._setProperty('_targetFrameRate', fps);
    this._runFrames();
    return this;
  }
};
/**
 * Returns the current framerate.
 *
 * @return {Number} current frameRate
 */
p5.prototype.getFrameRate = function() {
  return this.frameRate();
};

/**
 * Specifies the number of frames to be displayed every second. For example,
 * the function call frameRate(30) will attempt to refresh 30 times a second.
 * If the processor is not fast enough to maintain the specified rate, the
 * frame rate will not be achieved. Setting the frame rate within setup() is
 * recommended. The default rate is 60 frames per second.
 *
 * Calling frameRate() with no arguments returns the current framerate.
 *
 * @param {Number} [fps] number of frames to be displayed every second
 */
p5.prototype.setFrameRate = function(fps) {
  return this.frameRate(fps);
};

/**
 * Hides the cursor from view.
 *
 * @method noCursor
 * @example
 * <div><code>
 * function setup() {
 *   noCursor();
 * }
 *
 * function draw() {
 *   background(200);
 *   ellipse(mouseX, mouseY, 10, 10);
 * }
 * </code></div>
 */
p5.prototype.noCursor = function() {
  this._curElement.elt.style.cursor = 'none';
};


/**
 * System variable that stores the width of the entire screen display. This
 * is used to run a full-screen program on any display size.
 *
 * @property displayWidth
 * @example
 * <div class="norender"><code>
 * createCanvas(displayWidth, displayHeight);
 * </code></div>
 */
p5.prototype.displayWidth = screen.width;

/**
 * System variable that stores the height of the entire screen display. This
 * is used to run a full-screen program on any display size.
 *
 * @property displayHeight
 * @example
 * <div class="norender"><code>
 * createCanvas(displayWidth, displayHeight);
 * </code></div>
 */
p5.prototype.displayHeight = screen.height;

/**
 * System variable that stores the width of the inner window, it maps to
 * window.innerWidth.
 *
 * @property windowWidth
 * @example
 * <div class="norender"><code>
 * createCanvas(windowWidth, windowHeight);
 * </code></div>
 */
p5.prototype.windowWidth = window.innerWidth;
/**
 * System variable that stores the height of the inner window, it maps to
 * window.innerHeight.
 *
 * @property windowHeight
 * @example
 * <div class="norender"><code>
 * createCanvas(windowWidth, windowHeight);
 * </code></div>
 */
p5.prototype.windowHeight = window.innerHeight;

/**
 * The windowResized() function is called once every time the browser window
 * is resized. This is a good place to resize the canvas or do any other
 * adjustements to accomodate the new window size.
 *
 * @method windowResized
 * @example
 * <div class="norender"><code>
 * function setup() {
 *   createCanvas(windowWidth, windowHeight);
 * }
 *
 * function draw() {
 *  background(0, 100, 200);
 * }
 *
 * function windowResized() {
 *   resizeCanvas(windowWidth, windowHeight);
 * }
 * </code></div>
 */
p5.prototype._onresize = function(e){
  this._setProperty('windowWidth', window.innerWidth);
  this._setProperty('windowHeight', window.innerHeight);
  var context = this._isGlobal ? window : this;
  var executeDefault;
  if (typeof context.windowResized === 'function') {
    executeDefault = context.windowResized(e);
    if (executeDefault !== undefined && !executeDefault) {
      e.preventDefault();
    }
  }
};

/**
 * System variable that stores the width of the drawing canvas. This value
 * is set by the first parameter of the createCanvas() function.
 * For example, the function call createCanvas(320, 240) sets the width
 * variable to the value 320. The value of width defaults to 100 if
 * createCanvas() is not used in a program.
 *
 * @property width
 */
p5.prototype.width = 0;

/**
 * System variable that stores the height of the drawing canvas. This value
 * is set by the second parameter of the createCanvas() function. For
 * example, the function call createCanvas(320, 240) sets the height
 * variable to the value 240. The value of height defaults to 100 if
 * createCanvas() is not used in a program.
 *
 * @property height
 */
p5.prototype.height = 0;

/**
 * If argument is given, sets the sketch to fullscreen or not based on the
 * value of the argument. If no argument is given, returns the current
 * fullscreen state. Note that due to browser restrictions this can only
 * be called on user input, for example, on mouse press like the example
 * below.
 *
 * @method fullScreen
 * @param  {Boolean} [val] whether the sketch should be fullscreened or not
 * @return {Boolean} current fullscreen state
 * @example
 * <div>
 * <code>
 * // Clicking in the box toggles fullscreen on and off.
 * function setup() {
 *   background(200);
 * }
 * function mousePressed() {
 *   if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
 *     var fs = fullScreen();
 *     fullScreen(!fs);
 *   }
 * }
 * </code>
 * </div>
 */
p5.prototype.fullScreen = function(val) {
  // no arguments, return fullscreen or not
  if (typeof val === 'undefined') {
    return document.fullscreenElement ||
           document.webkitFullscreenElement ||
           document.mozFullScreenElement ||
           document.msFullscreenElement;
  } else { // otherwise set to fullscreen or not
    if (val) {
      launchFullscreen(document.documentElement);
    } else {
      exitFullscreen();
    }
  }
};

/**
 * Toggles pixel scaling for high pixel density displays. By default
 * pixel scaling is on, call devicePixelScaling(false) to turn it off.
 * This devicePixelScaling() function must be the first line of code
 * inside setup().
 *
 * @method devicePixelScaling
 * @param  {Boolean|Number} [val] whether or how much the sketch should scale
 * @example
 * <div>
 * <code>
 * function setup() {
 *   devicePixelScaling(false);
 *   createCanvas(100, 100);
 *   background(200);
 *   ellipse(width/2, height/2, 50, 50);
 * }
 * </code>
 * </div>
 * <div>
 * <code>
 * function setup() {
 *   devicePixelScaling(3.0);
 *   createCanvas(100, 100);
 *   background(200);
 *   ellipse(width/2, height/2, 50, 50);
 * }
 * </code>
 * </div>
 */
p5.prototype.devicePixelScaling = function(val) {
  if (val) {
    if (typeof val === 'number') {
      this.pixelDensity = val;
    }
    else {
      this.pixelDensity = window.devicePixelRatio || 1;
    }
  } else {
    this.pixelDensity = 1;
  }
  this.resizeCanvas(this.width, this.height, true);
};

function launchFullscreen(element) {
  var enabled = document.fullscreenEnabled ||
                document.webkitFullscreenEnabled ||
                document.mozFullScreenEnabled ||
                document.msFullscreenEnabled;
  if (!enabled) {
    throw new Error('Fullscreen not enabled in this browser.');
  }
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}


/**
 * Gets the current URL.
 * @method getURL
 * @return {String} url
 * @example
 * <div>
 * <code>
 * var url;
 * var x = 100;
 *
 * function setup() {
 *   fill(0);
 *   noStroke();
 *   url = getURL();
 * }
 *
 * function draw() {
 *   background(200);
 *   text(url, x, height/2);
 *   x--;
 * }
 * </code>
 * </div>
 */
p5.prototype.getURL = function() {
  return location.href;
};
/**
 * Gets the current URL path as an array.
 * @method getURLPath
 * @return {Array} path components
 * @example
 * <div class='norender'><code>
 * function setup() {
 *   var urlPath = getURLPath();
 *   for (var i=0; i&lt;urlPath.length; i++) {
 *     text(urlPath[i], 10, i*20+20);
 *   }
 * }
 * </code></div>
 */
p5.prototype.getURLPath = function() {
  return location.pathname.split('/').filter(function(v){return v!=='';});
};
/**
 * Gets the current URL params as an Object.
 * @method getURLParams
 * @return {Object} URL params
 * @example
 * <div class='norender'>
 * <code>
 * // Example: http://p5js.org?year=2014&month=May&day=15
 *
 * function setup() {
 *   var params = getURLParams();
 *   text(params.day, 10, 20);
 *   text(params.month, 10, 40);
 *   text(params.year, 10, 60);
 * }
 * </code>
 * </div>
 */
p5.prototype.getURLParams = function() {
  var re = /[?&]([^&=]+)(?:[&=])([^&=]+)/gim;
  var m;
  var v={};
  while ((m = re.exec(location.search)) != null) {
    if (m.index === re.lastIndex) {
      re.lastIndex++;
    }
    v[m[1]]=m[2];
  }
  return v;
};

module.exports = p5;

},{"./constants":47,"./core":48}],51:[function(_dereq_,module,exports){
/**
 * @for p5
 * @requires core
 */

'use strict';

var p5 = _dereq_('./core');
var doFriendlyWelcome = false; // TEMP until we get it all working LM

// -- Borrowed from jQuery 1.11.3 --
var class2type = {};
var toString = class2type.toString;
var names = ['Boolean', 'Number', 'String', 'Function',
             'Array', 'Date', 'RegExp', 'Object', 'Error'];
for (var n=0; n<names.length; n++) {
  class2type[ '[object ' + names[n] + ']' ] = names[n].toLowerCase();
}
var getType = function( obj ) {
  if ( obj == null ) {
    return obj + '';
  }
  return typeof obj === 'object' || typeof obj === 'function' ?
    class2type[ toString.call(obj) ] || 'object' :
    typeof obj;
};
var isArray = Array.isArray || function( obj ) {
  return getType(obj) === 'array';
};
var isNumeric =function( obj ) {
  // parseFloat NaNs numeric-cast false positives (null|true|false|"")
  // ...but misinterprets leading-number strings, particularly hex literals
  // subtraction forces infinities to NaN
  // adding 1 corrects loss of precision from parseFloat (#15100)
  return !isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
};
// -- End borrow --

/**
 * Checks the definition type against the argument type
 * If any of these passes (in order), it matches:
 *
 * - p5.* definitions are checked with instanceof
 * - Booleans are let through (everything is truthy or falsey)
 * - Lowercase of the definition is checked against the js type
 * - Number types are checked to see if they are numerically castable
 */
var numberTypes = ['Number', 'Integer', 'Number/Constant'];
function typeMatches(defType, argType, arg) {
  if(defType.match(/^p5\./)) {
    var parts = defType.split('.');
    return arg instanceof p5[parts[1]];
  }
  return defType === 'Boolean' || // Anything is truthy, cover in Debug Guide
    (defType.toLowerCase() === argType) ||
    (numberTypes.indexOf(defType) > -1 && isNumeric(arg));
}

/**
 * Prints out a fancy, colorful message to the console log
 *
 * @param  {String}               message the words to be said
 * @param  {String}               func    the name of the function to link
 * @param  {Integer/Color String} color   CSS color string or error type
 *
 * @return console logs
 */
// Wrong number of params, undefined param, wrong type
var PARAM_COUNT = 0;
var EMPTY_VAR = 1;
var WRONG_TYPE = 2;
var FILE_LOAD = 3;
// p5.js blue, p5.js orange, auto dark green; fallback p5.js darkened magenta
// See testColors below for all the color codes and names
var typeColors = ['#2D7BB6', '#EE9900', '#4DB200', '#C83C00'];
function report(message, func, color) {
  if(doFriendlyWelcome){
    friendlyWelcome();
    doFriendlyWelcome =false;
  }
  if ('undefined' === getType(color)) {
    color   = '#B40033'; // dark magenta
  } else if (getType(color) === 'number') { // Type to color
    color = typeColors[color];
  }
  // LM TEMP commenting this out until we get the whole system working
  // if (func.substring(0,4) === 'load'){
  //   console.log(
  //     '%c> p5.js says: '+message+'%c'+
  //     '[https://github.com/processing/p5.js/wiki/Local-server]',
  //     'background-color:' + color + ';color:#FFF;',
  //     'background-color:transparent;color:' + color +';',
  //     'background-color:' + color + ';color:#FFF;',
  //     'background-color:transparent;color:' + color +';'
  //   );
  // }
  // else{
  //   console.log(
  //     '%c> p5.js says: '+message+'%c [http://p5js.org/reference/#p5/'+func+
  //     ']', 'background-color:' + color + ';color:#FFF;',
  //     'background-color:transparent;color:' + color +';'
  //   );
  // }
}

/**
 * Validate all the parameters of a function for number and type
 * NOTE THIS FUNCTION IS TEMPORARILY DISABLED UNTIL FURTHER WORK
 * AND UPDATES ARE IMPLEMENTED. -LMCCART
 *
 * @param  {String} func  name of function we're checking
 * @param  {Array}  args  pass of the JS default arguments array
 * @param  {Array}  types List of types accepted ['Number', 'String, ...] OR
 *                        a list of lists for each format: [
 *                          ['String', 'Number', 'Number'],
 *                          ['String', 'Number', 'Number', 'Number', 'Number'
 *                        ]
 *
 * @return console logs
 */
p5.prototype._validateParameters = function(func, args, types) {
  if (!isArray(types[0])) {
    types = [types];
  }
  // Check number of parameters
  // Example: "You wrote ellipse(X,X,X). ellipse was expecting 4
  //          parameters. Try ellipse(X,X,X,X)."
  var diff = Math.abs(args.length-types[0].length);
  var message, tindex = 0;
  for (var i=1, len=types.length; i<len; i++) {
    var d = Math.abs(args.length-types[i].length);
    if (d <= diff) {
      tindex = i;
      diff = d;
    }
  }
  var symbol = 'X'; // Parameter placeholder
  if(diff > 0) {
    message = 'You wrote ' + func + '(';
    // Concat an appropriate number of placeholders for call
    if (args.length > 0) {
      message += symbol + Array(args.length).join(',' + symbol);
    }
    message += '). ' + func + ' was expecting ' + types[tindex].length +
      ' parameters. Try ' + func + '(';
    // Concat an appropriate number of placeholders for definition
    if (types[tindex].length > 0) {
      message += symbol + Array(types[tindex].length).join(',' + symbol);
    }
    message += ').';
    // If multiple definitions
    if (types.length > 1) {
      message += ' ' + func + ' takes different numbers of parameters ' +
        'depending on what you want to do. Click this link to learn more: ';
    }
    report(message, func, PARAM_COUNT);
  }
  // Type checking
  // Example: "It looks like ellipse received an empty variable in spot #2."
  // Example: "ellipse was expecting a number for parameter #1,
  //           received "foo" instead."
  for (var format=0; format<types.length; format++) {
    for (var p=0; p < types[format].length && p < args.length; p++) {
      var defType = types[format][p];
      var argType = getType(args[p]);
      if ('undefined' === argType || null === argType) {
        report('It looks like ' + func +
          ' received an empty variable in spot #' + (p+1) +
          '. If not intentional, this is often a problem with scope: ' +
          '[link to scope].', func, EMPTY_VAR);
      } else if (defType !== '*' && !typeMatches(defType, argType, args[p])) {
        message = func + ' was expecting a ' + defType.toLowerCase() +
          ' for parameter #' + (p+1) + ', received ';
        // Wrap strings in quotes
        message += 'string' === argType ? '"' + args[p] + '"' : args[p];
        message += ' instead.';
        // If multiple definitions
        if (types.length > 1) {
          message += ' ' + func + ' takes different numbers of parameters ' +
            'depending on what you want to do. ' +
            'Click this link to learn more:';
        }
        report(message, func, WRONG_TYPE);
      }
    }
  }
};
/*
 * NOTE THIS FUNCTION IS TEMPORARILY DISABLED UNTIL FURTHER WORK
 * AND UPDATES ARE IMPLEMENTED. -LMCCART
 */
p5.prototype._validateParameters = function() {
  return true;
};

var errorCases = {
  '0': {
    fileType: 'image',
    method: 'loadImage',
    message: ' hosting the image online,'
  },
  '1': {
    fileType: 'XML file',
    method: 'loadXML'
  },
  '2': {
    fileType: 'table file',
    method: 'loadTable'
  },
  '3': {
    fileType: 'text file',
    method: 'loadStrings'
  }
};
p5._friendlyFileLoadError = function (errorType, filePath) {
  var errorInfo = errorCases[ errorType ];
  var message = 'It looks like there was a problem' +
  ' loading your ' + errorInfo.fileType + '.' +
  ' Try checking if the file path%c [' + filePath + '] %cis correct,' +
  (errorInfo.message || '') + ' or running a local server.';
  report(message, errorInfo.method, FILE_LOAD);
};

function friendlyWelcome() {
  // p5.js brand - magenta: #ED225D
  var astrixBgColor = 'transparent';
  var astrixTxtColor = '#ED225D';
  var welcomeBgColor = '#ED225D';
  var welcomeTextColor = 'white';
  console.log(
  '%c    _ \n'+
  ' /\\| |/\\ \n'+
  ' \\ ` \' /  \n'+
  ' / , . \\  \n'+
  ' \\/|_|\\/ '+
  '\n\n%c> p5.js says: Welcome! '+
  'This is your friendly debugger. ' +
  'To turn me off switch to using “p5.min.js”.',
  'background-color:'+astrixBgColor+';color:' + astrixTxtColor +';',
  'background-color:'+welcomeBgColor+';color:' + welcomeTextColor +';'
  );
}

/**
 * Prints out all the colors in the color pallete with white text.
 * For color blindness testing.
 */
/* function testColors() {
  var str = 'A box of biscuits, a box of mixed biscuits and a biscuit mixer';
  report(str, 'println', '#ED225D'); // p5.js magenta
  report(str, 'println', '#2D7BB6'); // p5.js blue
  report(str, 'println', '#EE9900'); // p5.js orange
  report(str, 'println', '#A67F59'); // p5.js light brown
  report(str, 'println', '#704F21'); // p5.js gold
  report(str, 'println', '#1CC581'); // auto cyan
  report(str, 'println', '#FF6625'); // auto orange
  report(str, 'println', '#79EB22'); // auto green
  report(str, 'println', '#B40033'); // p5.js darkened magenta
  report(str, 'println', '#084B7F'); // p5.js darkened blue
  report(str, 'println', '#945F00'); // p5.js darkened orange
  report(str, 'println', '#6B441D'); // p5.js darkened brown
  report(str, 'println', '#2E1B00'); // p5.js darkened gold
  report(str, 'println', '#008851'); // auto dark cyan
  report(str, 'println', '#C83C00'); // auto dark orange
  report(str, 'println', '#4DB200'); // auto dark green
} */

module.exports = p5;

},{"./core":48}],52:[function(_dereq_,module,exports){
/**
 * @module DOM
 * @submodule DOM
 * @for p5.Element
 */

var p5 = _dereq_('./core');

/**
 * Base class for all elements added to a sketch, including canvas,
 * graphics buffers, and other HTML elements. Methods in blue are
 * included in the core functionality, methods in brown are added
 * with the <a href="http://p5js.org/libraries/">p5.dom library</a>.
 * It is not called directly, but p5.Element
 * objects are created by calling createCanvas, createGraphics,
 * or in the p5.dom library, createDiv, createImg, createInput, etc.
 *
 * @class p5.Element
 * @constructor
 * @param {String} elt DOM node that is wrapped
 * @param {Object} [pInst] pointer to p5 instance
 */
p5.Element = function(elt, pInst) {
  /**
   * Underlying HTML element. All normal HTML methods can be called on this.
   *
   * @property elt
   */
  this.elt = elt;
  this._pInst = pInst;
  this._events = {};
  this.width = this.elt.offsetWidth;
  this.height = this.elt.offsetHeight;
};

/**
 *
 * Attaches the element to the parent specified. A way of setting
 * the container for the element. Accepts either a string ID, DOM
 * node, or p5.Element. If no arguments given, parent node is returned.
 *
 * @method parent
 * @param  {String|Object} parent the ID, DOM node, or p5.Element
 *                         of desired parent element
 * @return {p5.Element}
 * @example
 * <div class="norender"><code>
 * // in the html file:
 * &lt;div id="myContainer">&lt;/div>
 * // in the js file:
 * var cnv = createCanvas(100, 100);
 * cnv.parent("myContainer");
 * </code></div>
 * <div class='norender'><code>
 * var div0 = createDiv('this is the parent');
 * var div1 = createDiv('this is the child');
 * div1.parent(div0); // use p5.Element
 * </code></div>
 * <div class='norender'><code>
 * var div0 = createDiv('this is the parent');
 * div0.id('apples');
 * var div1 = createDiv('this is the child');
 * div1.parent('apples'); // use id
 * </code></div>
 * <div class='norender'><code>
 * var elt = document.getElementById('myParentDiv');
 * var div1 = createDiv('this is the child');
 * div1.parent(elt); // use element from page
 * </code></div>
 */
p5.Element.prototype.parent = function(p) {
  if (arguments.length === 0){
    return this.elt.parentNode;
  } else {
    if (typeof p === 'string') {
      p = document.getElementById(p);
    } else if (p instanceof p5.Element) {
      p = p.elt;
    }
    p.appendChild(this.elt);
    return this;
  }
};

/**
 *
 * Sets the ID of the element
 *
 * @method id
 * @param  {String} id ID of the element
 * @return {p5.Element}
 */
p5.Element.prototype.id = function(id) {
  this.elt.id = id;
  return this;
};

/**
 *
 * Adds given class to the element
 *
 * @method class
 * @param  {String} class class to add
 * @return {p5.Element}
 */
p5.Element.prototype.class = function(c) {
  this.elt.className += ' '+c;
  return this;
};

/**
 * The .mousePressed() function is called once after every time a
 * mouse button is pressed over the element. This can be used to
 * attach element specific event listeners.
 *
 * @method mousePressed
 * @param  {Function} fxn function to be fired when mouse is
 *                    pressed over the element.
 * @return {p5.Element}
 * @example
 * <div class='norender'><code>
 * var cnv;
 * var d;
 * var g;
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   cnv.mousePressed(changeGray); // attach listener for
 *                                 // canvas click only
 *   d = 10;
 *   g = 100;
 * }
 *
 * function draw() {
 *   background(g);
 *   ellipse(width/2, height/2, d, d);
 * }
 *
 * // this function fires with any click anywhere
 * function mousePressed() {
 *   d = d + 10;
 * }
 *
 * // this function fires only when cnv is clicked
 * function changeGray() {
 *   g = random(0, 255);
 * }
 * </code></div>
 *
 */
p5.Element.prototype.mousePressed = function (fxn) {
  attachListener('mousedown', fxn, this);
  attachListener('touchstart', fxn, this);
  return this;
};

/**
 * The .mouseWheel() function is called once after every time a
 * mouse wheel is scrolled over the element. This can be used to
 * attach element specific event listeners.<br><br>
 * The event.wheelDelta or event.detail property returns negative values if
 * the mouse wheel if rotated up or away from the user and positive in the
 * other direction. On OS X with "natural" scrolling enabled, the values are
 * opposite.
 *
 * @method mouseWheel
 * @param  {Function} fxn function to be fired when mouse wheel is
 *                    scrolled over the element.
 * @return {p5.Element}
 */
p5.Element.prototype.mouseWheel = function (fxn) {
  attachListener('mousewheel', fxn, this);
  return this;
};

/**
 * The .mouseReleased() function is called once after every time a
 * mouse button is released over the element. This can be used to
 * attach element specific event listeners.
 *
 * @method mouseReleased
 * @param  {Function} fxn function to be fired when mouse is
 *                    released over the element.
 * @return {p5.Element}
 */
p5.Element.prototype.mouseReleased = function (fxn) {
  attachListener('mouseup', fxn, this);
  attachListener('touchend', fxn, this);
  return this;
};


/**
 * The .mouseClicked() function is called once after a mouse button is
 * pressed and released over the element. This can be used to
 * attach element specific event listeners.
 *
 * @method mouseClicked
 * @param  {Function} fxn function to be fired when mouse is
 *                    clicked over the element.
 * @return {p5.Element}
 */
p5.Element.prototype.mouseClicked = function (fxn) {
  attachListener('click', fxn, this);
  return this;
};

/**
 * The .mouseMoved() function is called once every time a
 * mouse moves over the element. This can be used to attach an
 * element specific event listener.
 *
 * @method mouseMoved
 * @param  {Function} fxn function to be fired when mouse is
 *                    moved over the element.
 * @return {p5.Element}
 */
p5.Element.prototype.mouseMoved = function (fxn) {
  attachListener('mousemove', fxn, this);
  attachListener('touchmove', fxn, this);
  return this;
};

/**
 * The .mouseOver() function is called once after every time a
 * mouse moves onto the element. This can be used to attach an
 * element specific event listener.
 *
 * @method mouseOver
 * @param  {Function} fxn function to be fired when mouse is
 *                    moved over the element.
 * @return {p5.Element}
 */
p5.Element.prototype.mouseOver = function (fxn) {
  attachListener('mouseover', fxn, this);
  return this;
};


/**
 * The .changed() function is called when the value of an
 * element is changed.
 * This can be used to attach an element specific event listener.
 *
 * @method changed
 * @param  {Function} fxn function to be fired when the value of an
 * element changes.
 * @return {p5.Element}
 */
p5.Element.prototype.changed = function (fxn) {
  attachListener('change', fxn, this);
  return this;
};

/**
 * The .input() function is called when any user input is
 * detected with an element. The input event is often used
 * to detect keystrokes in a input element, or changes on a
 * slider element. This can be used to attach an element specific
 * event listener.
 *
 * @method input
 * @param  {Function} fxn function to be fired on user input.
 * @return {p5.Element}
 */
p5.Element.prototype.input = function (fxn) {
  attachListener('input', fxn, this);
  return this;
};

/**
 * The .mouseOut() function is called once after every time a
 * mouse moves off the element. This can be used to attach an
 * element specific event listener.
 *
 * @method mouseOut
 * @param  {Function} fxn function to be fired when mouse is
 *                    moved off the element.
 * @return {p5.Element}
 */
p5.Element.prototype.mouseOut = function (fxn) {
  attachListener('mouseout', fxn, this);
  return this;
};

/**
 * The .touchStarted() function is called once after every time a touch is
 * registered. This can be used to attach element specific event listeners.
 *
 * @method touchStarted
 * @param  {Function} fxn function to be fired when touch is
 *                    started over the element.
 * @return {p5.Element}
 * @example
 * <div class='norender'><code>
 * var cnv;
 * var d;
 * var g;
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   cnv.touchStarted(changeGray); // attach listener for
 *                                 // canvas click only
 *   d = 10;
 *   g = 100;
 * }
 *
 * function draw() {
 *   background(g);
 *   ellipse(width/2, height/2, d, d);
 * }
 *
 * // this function fires with any touch anywhere
 * function touchStarted() {
 *   d = d + 10;
 * }
 *
 * // this function fires only when cnv is clicked
 * function changeGray() {
 *   g = random(0, 255);
 * }
 * </code></div>
 *
 */
p5.Element.prototype.touchStarted = function (fxn) {
  attachListener('touchstart', fxn, this);
  attachListener('mousedown', fxn, this);
  return this;
};

/**
 * The .touchMoved() function is called once after every time a touch move is
 * registered. This can be used to attach element specific event listeners.
 *
 * @method touchMoved
 * @param  {Function} fxn function to be fired when touch is moved
 *                    over the element.
 * @return {p5.Element}
 * @example
 * <div class='norender'><code>
 * var cnv;
 * var g;
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   cnv.touchMoved(changeGray); // attach listener for
 *                               // canvas click only
 *   g = 100;
 * }
 *
 * function draw() {
 *   background(g);
 * }
 *
 * // this function fires only when cnv is clicked
 * function changeGray() {
 *   g = random(0, 255);
 * }
 * </code></div>
 *
 */
p5.Element.prototype.touchMoved = function (fxn) {
  attachListener('touchmove', fxn, this);
  attachListener('mousemove', fxn, this);
  return this;
};

/**
 * The .touchEnded() function is called once after every time a touch is
 * registered. This can be used to attach element specific event listeners.
 *
 * @method touchEnded
 * @param  {Function} fxn function to be fired when touch is
 *                    ended over the element.
 * @return {p5.Element}
 * @example
 * <div class='norender'><code>
 * var cnv;
 * var d;
 * var g;
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   cnv.touchEnded(changeGray);   // attach listener for
 *                                 // canvas click only
 *   d = 10;
 *   g = 100;
 * }
 *
 * function draw() {
 *   background(g);
 *   ellipse(width/2, height/2, d, d);
 * }
 *
 * // this function fires with any touch anywhere
 * function touchEnded() {
 *   d = d + 10;
 * }
 *
 * // this function fires only when cnv is clicked
 * function changeGray() {
 *   g = random(0, 255);
 * }
 * </code></div>
 *
 */
p5.Element.prototype.touchEnded = function (fxn) {
  attachListener('touchend', fxn, this);
  attachListener('mouseup', fxn, this);
  return this;
};



/**
 * The .dragOver() function is called once after every time a
 * file is dragged over the element. This can be used to attach an
 * element specific event listener.
 *
 * @method dragOver
 * @param  {Function} fxn function to be fired when mouse is
 *                    dragged over the element.
 * @return {p5.Element}
 */
p5.Element.prototype.dragOver = function (fxn) {
  attachListener('dragover', fxn, this);
  return this;
};

/**
 * The .dragLeave() function is called once after every time a
 * dragged file leaves the element area. This can be used to attach an
 * element specific event listener.
 *
 * @method dragLeave
 * @param  {Function} fxn function to be fired when mouse is
 *                    dragged over the element.
 * @return {p5.Element}
 */
p5.Element.prototype.dragLeave = function (fxn) {
  attachListener('dragleave', fxn, this);
  return this;
};

/**
 * The .drop() function is called for each file dropped on the element.
 * It requires a callback that is passed a p5.File object.  You can
 * optionally pass two callbacks, the first one (required) is triggered
 * for each file dropped when the file is loaded.  The second (optional)
 * is triggered just once when a file (or files) are dropped.
 *
 * @method drop
 * @param  {Function} callback triggered when files are dropped.
 * @param  {Function} callback to receive loaded file.
 * @return {p5.Element}
 */
p5.Element.prototype.drop = function (callback, fxn) {
  // Make a file loader callback and trigger user's callback
  function makeLoader(theFile) {
    // Making a p5.File object
    var p5file = new p5.File(theFile);
    return function(e) {
      p5file.data = e.target.result;
      callback(p5file);
    };
  }

  // Is the file stuff supported?
  if (window.File && window.FileReader && window.FileList && window.Blob) {

    // If you want to be able to drop you've got to turn off
    // a lot of default behavior
    attachListener('dragover',function(evt) {
      evt.stopPropagation();
      evt.preventDefault();
    },this);

    // If this is a drag area we need to turn off the default behavior
    attachListener('dragleave',function(evt) {
      evt.stopPropagation();
      evt.preventDefault();
    },this);

    // If just one argument it's the callback for the files
    if (arguments.length > 1) {
      attachListener('drop', fxn, this);
    }

    // Deal with the files
    attachListener('drop', function(evt) {

      evt.stopPropagation();
      evt.preventDefault();

      // A FileList
      var files = evt.dataTransfer.files;

      // Load each one and trigger the callback
      for (var i = 0; i < files.length; i++) {
        var f = files[i];
        var reader = new FileReader();
        reader.onload = makeLoader(f);


        // Text or data?
        // This should likely be improved
        if (f.type.indexOf('text') > -1) {
          reader.readAsText(f);
        } else {
          reader.readAsDataURL(f);
        }
      }
    }, this);
  } else {
    console.log('The File APIs are not fully supported in this browser.');
  }

  return this;
};




function attachListener(ev, fxn, ctx) {
  // LM removing, not sure why we had this?
  // var _this = ctx;
  // var f = function (e) { fxn(e, _this); };
  var f = fxn.bind(ctx);
  ctx.elt.addEventListener(ev, f, false);
  ctx._events[ev] = f;
}

/**
 * Helper fxn for sharing pixel methods
 *
 */
p5.Element.prototype._setProperty = function (prop, value) {
  this[prop] = value;
};


module.exports = p5.Element;

},{"./core":48}],53:[function(_dereq_,module,exports){
/**
 * @module Rendering
 * @submodule Rendering
 * @for p5
 */

var p5 = _dereq_('./core');
var constants = _dereq_('./constants');

/**
 * Thin wrapper around a renderer, to be used for creating a
 * graphics buffer object. Use this class if you need
 * to draw into an off-screen graphics buffer. The two parameters define the
 * width and height in pixels. The fields and methods for this class are
 * extensive, but mirror the normal drawing API for p5.
 *
 * @class p5.Graphics
 * @constructor
 * @extends p5.Element
 * @param {String} elt DOM node that is wrapped
 * @param {Object} [pInst] pointer to p5 instance
 * @param {Boolean} whether we're using it as main canvas
 */
p5.Graphics = function(w, h, renderer, pInst) {

  var r = renderer || constants.P2D;

  var c = document.createElement('canvas');
  var node = this._userNode || document.body;
  node.appendChild(c);

  p5.Element.call(this, c, pInst, false);
  this._styles = [];
  this.width = w;
  this.height = h;
  this.pixelDensity = pInst.pixelDensity;

  if (r === constants.WEBGL) {
    this._renderer = new p5.Renderer3D(c, pInst, false);
  } else {
    this._renderer = new p5.Renderer2D(c, pInst, false);
  }

  this._renderer.resize(w, h);
  this._renderer._applyDefaults();

  pInst._elements.push(this);

  // bind methods and props of p5 to the new object
  for (var p in p5.prototype) {
    if (!this[p]) {
      if (typeof p5.prototype[p] === 'function') {
        this[p] = p5.prototype[p].bind(this);
      } else {
        this[p] = p5.prototype[p];
      }
    }
  }

  return this;
};

p5.Graphics.prototype = Object.create(p5.Element.prototype);

module.exports = p5.Graphics;

},{"./constants":47,"./core":48}],54:[function(_dereq_,module,exports){
/**
 * @module Rendering
 * @submodule Rendering
 * @for p5
 */

var p5 = _dereq_('./core');
var constants = _dereq_('../core/constants');

/**
 * Main graphics and rendering context, as well as the base API
 * implementation for p5.js "core". To be used as the superclass for
 * Renderer2D and Renderer3D classes, respecitvely.
 *
 * @class p5.Renderer
 * @constructor
 * @extends p5.Element
 * @param {String} elt DOM node that is wrapped
 * @param {Object} [pInst] pointer to p5 instance
 * @param {Boolean} whether we're using it as main canvas
 */
p5.Renderer = function(elt, pInst, isMainCanvas) {
  p5.Element.call(this, elt, pInst);
  this.canvas = elt;
  this._pInst = pInst;
  if (isMainCanvas) {
    this._isMainCanvas = true;
    // for pixel method sharing with pimage
    this._pInst._setProperty('_curElement', this);
    this._pInst._setProperty('canvas', this.canvas);
    this._pInst._setProperty('width', this.width);
    this._pInst._setProperty('height', this.height);
  } else { // hide if offscreen buffer by default
    this.canvas.style.display = 'none';
    this._styles = []; // non-main elt styles stored in p5.Renderer
  }


  this._textSize = 12;
  this._textLeading = 15;
  this._textFont = 'sans-serif';
  this._textStyle = constants.NORMAL;
  this._textAscent = null;
  this._textDescent = null;


  this._rectMode = constants.CORNER;
  this._ellipseMode = constants.CENTER;
  this._curveTightness = 0;
  this._imageMode = constants.CORNER;

  this._tint = null;
  this._doStroke = true;
  this._doFill = true;
  this._strokeSet = false;
  this._fillSet = false;
  this._colorMode = constants.RGB;
  this._colorMaxes = {
    rgb: [255, 255, 255, 255],
    hsb: [360, 100, 100, 1],
    hsl: [360, 100, 100, 1]
  };

};

p5.Renderer.prototype = Object.create(p5.Element.prototype);




/**
 * Resize our canvas element.
 */
p5.Renderer.prototype.resize = function(w, h) {
  this.width = w;
  this.height = h;
  this.elt.width = w * this._pInst.pixelDensity;
  this.elt.height = h * this._pInst.pixelDensity;
  this.elt.style.width = w +'px';
  this.elt.style.height = h + 'px';
  if (this._isMainCanvas) {
    this._pInst._setProperty('width', this.width);
    this._pInst._setProperty('height', this.height);
  }
};

p5.Renderer.prototype.textLeading = function(l) {

  if (arguments.length && arguments[0]) {

    this._setProperty('_textLeading', l);
    return this;
  }

  return this._textLeading;
};

p5.Renderer.prototype.textSize = function(s) {

  if (arguments.length && arguments[0]) {

    this._setProperty('_textSize', s);
    this._setProperty('_textLeading', s * constants._DEFAULT_LEADMULT);
    return this._applyTextProperties();
  }

  return this._textSize;
};

p5.Renderer.prototype.textStyle = function(s) {

  if (arguments.length && arguments[0]) {

    if (s === constants.NORMAL ||
      s === constants.ITALIC ||
      s === constants.BOLD) {
      this._setProperty('_textStyle', s);
    }

    return this._applyTextProperties();
  }

  return this._textStyle;
};

p5.Renderer.prototype.textAscent = function() {
  if (this._textAscent === null) {
    this._updateTextMetrics();
  }
  return this._textAscent;
};

p5.Renderer.prototype.textDescent = function() {

  if (this._textDescent === null) {
    this._updateTextMetrics();
  }
  return this._textDescent;
};

/**
 * Helper fxn to check font type (system or otf)
 */
p5.Renderer.prototype._isOpenType = function(f) {

  f = f || this._textFont;
  return (typeof f === 'object' && f.font && f.font.supported);
};

p5.Renderer.prototype._updateTextMetrics = function() {

  if (this._isOpenType()) {

    this._setProperty('_textAscent', this._textFont._textAscent());
    this._setProperty('_textDescent', this._textFont._textDescent());
    return this;
  }

  // Adapted from http://stackoverflow.com/a/25355178
  var text = document.createElement('span');
  text.style.fontFamily = this._textFont;
  text.style.fontSize = this._textSize + 'px';
  text.innerHTML = 'ABCjgq|';

  var block = document.createElement('div');
  block.style.display = 'inline-block';
  block.style.width = '1px';
  block.style.height = '0px';

  var container = document.createElement('div');
  container.appendChild(text);
  container.appendChild(block);

  container.style.height = '0px';
  container.style.overflow = 'hidden';
  document.body.appendChild(container);

  block.style.verticalAlign = 'baseline';
  var blockOffset = calculateOffset(block);
  var textOffset = calculateOffset(text);
  var ascent = blockOffset[1] - textOffset[1];

  block.style.verticalAlign = 'bottom';
  blockOffset = calculateOffset(block);
  textOffset = calculateOffset(text);
  var height = blockOffset[1] - textOffset[1];
  var descent = height - ascent;

  document.body.removeChild(container);

  this._setProperty('_textAscent', ascent);
  this._setProperty('_textDescent', descent);

  return this;
};

/**
 * Helper fxn to measure ascent and descent.
 * Adapted from http://stackoverflow.com/a/25355178
 */
function calculateOffset(object) {
  var currentLeft = 0,
    currentTop = 0;
  if (object.offsetParent) {
    do {
      currentLeft += object.offsetLeft;
      currentTop += object.offsetTop;
    } while (object = object.offsetParent);
  } else {
    currentLeft += object.offsetLeft;
    currentTop += object.offsetTop;
  }
  return [currentLeft, currentTop];
}

module.exports = p5.Renderer;

},{"../core/constants":47,"./core":48}],55:[function(_dereq_,module,exports){

var p5 = _dereq_('./core');
var canvas = _dereq_('./canvas');
var constants = _dereq_('./constants');
var filters = _dereq_('../image/filters');

_dereq_('./p5.Renderer');

/**
 * 2D graphics renderer class.  Can also be used as an off-screen
 * graphics buffer. A p5.Renderer2D object can be constructed
 * with the <code>createRenderer2D()</code> function. The fields and methods
 * for this class are extensive, but mirror the normal drawing API for p5.
 *
 * @class p5.Renderer2D
 * @constructor
 * @extends p5.Renderer
 * @param {String} elt DOM node that is wrapped
 * @param {Object} [pInst] pointer to p5 instance
 * @example
 * <div>
 * <code>
 * var pg;
 * function setup() {
 *   createCanvas(100, 100);
 *   pg = createRenderer2D(40, 40);
 * }
 * function draw() {
 *   background(200);
 *   pg.background(100);
 *   pg.noStroke();
 *   pg.ellipse(pg.width/2, pg.height/2, 50, 50);
 *   image(pg, 9, 30);
 *   image(pg, 51, 30);
 * }
 * </code>
 * </div>
 */
var styleEmpty = 'rgba(0,0,0,0)';
// var alphaThreshold = 0.00125; // minimum visible

p5.Renderer2D = function(elt, pInst, isMainCanvas){
  p5.Renderer.call(this, elt, pInst, isMainCanvas);
  this.drawingContext = this.canvas.getContext('2d');
  this._pInst._setProperty('drawingContext', this.drawingContext);
  return this;
};

p5.Renderer2D.prototype = Object.create(p5.Renderer.prototype);

p5.Renderer2D.prototype._applyDefaults = function() {
  this.drawingContext.fillStyle = constants._DEFAULT_FILL;
  this.drawingContext.strokeStyle = constants._DEFAULT_STROKE;
  this.drawingContext.lineCap = constants.ROUND;
  this.drawingContext.font = 'normal 12px sans-serif';
};

p5.Renderer2D.prototype.resize = function(w,h) {
  p5.Renderer.prototype.resize.call(this, w,h);
  this.drawingContext.scale(this._pInst.pixelDensity,
                            this._pInst.pixelDensity);
};

//////////////////////////////////////////////
// COLOR | Setting
//////////////////////////////////////////////

p5.Renderer2D.prototype.background = function() {
  this.drawingContext.save();
  this.drawingContext.setTransform(1, 0, 0, 1, 0, 0);
  this.drawingContext.scale(this._pInst.pixelDensity,
                            this._pInst.pixelDensity);

  if (arguments[0] instanceof p5.Image) {
    this._pInst.image(arguments[0], 0, 0, this.width, this.height);
  } else {
    var curFill = this.drawingContext.fillStyle;
    // create background rect
    var color = this._pInst.color.apply(this._pInst, arguments);
    var newFill = color.toString();
    this.drawingContext.fillStyle = newFill;
    this.drawingContext.fillRect(0, 0, this.width, this.height);
    // reset fill
    this.drawingContext.fillStyle = curFill;
  }
  this.drawingContext.restore();
};

p5.Renderer2D.prototype.clear = function() {
  this.drawingContext.clearRect(0, 0, this.width, this.height);
};

p5.Renderer2D.prototype.fill = function() {

  var ctx = this.drawingContext;
  var color = this._pInst.color.apply(this._pInst, arguments);
  ctx.fillStyle = color.toString();
};

p5.Renderer2D.prototype.stroke = function() {
  var ctx = this.drawingContext;
  var color = this._pInst.color.apply(this._pInst, arguments);
  ctx.strokeStyle = color.toString();
};

//////////////////////////////////////////////
// IMAGE | Loading & Displaying
//////////////////////////////////////////////

p5.Renderer2D.prototype.image =
  function (img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
  var frame = img.canvas || img.elt;
  try {
    if (this._tint && img.canvas) {
      this.drawingContext.drawImage(this._getTintedImageCanvas(img), sx, sy,
        sWidth, sHeight, dx, dy, dWidth, dHeight);
    } else {
      this.drawingContext.drawImage(frame, sx, sy, sWidth, sHeight, dx, dy,
        dWidth, dHeight);
    }
  } catch (e) {
    if (e.name !== 'NS_ERROR_NOT_AVAILABLE') {
      throw e;
    }
  }
};

p5.Renderer2D.prototype._getTintedImageCanvas = function (img) {
  if (!img.canvas) {
    return img;
  }
  var pixels = filters._toPixels(img.canvas);
  var tmpCanvas = document.createElement('canvas');
  tmpCanvas.width = img.canvas.width;
  tmpCanvas.height = img.canvas.height;
  var tmpCtx = tmpCanvas.getContext('2d');
  var id = tmpCtx.createImageData(img.canvas.width, img.canvas.height);
  var newPixels = id.data;
  for (var i = 0; i < pixels.length; i += 4) {
    var r = pixels[i];
    var g = pixels[i + 1];
    var b = pixels[i + 2];
    var a = pixels[i + 3];
    newPixels[i] = r * this._tint[0] / 255;
    newPixels[i + 1] = g * this._tint[1] / 255;
    newPixels[i + 2] = b * this._tint[2] / 255;
    newPixels[i + 3] = a * this._tint[3] / 255;
  }
  tmpCtx.putImageData(id, 0, 0);
  return tmpCanvas;
};


//////////////////////////////////////////////
// IMAGE | Pixels
//////////////////////////////////////////////

p5.Renderer2D.prototype.blendMode = function(mode) {
  this.drawingContext.globalCompositeOperation = mode;
};
p5.Renderer2D.prototype.blend = function() {
  var currBlend = this.drawingContext.globalCompositeOperation;
  var blendMode = arguments[arguments.length - 1];

  var copyArgs = Array.prototype.slice.call(
    arguments,
    0,
    arguments.length - 1
  );

  this.drawingContext.globalCompositeOperation = blendMode;
  this._pInst.copy.apply(this._pInst, copyArgs);
  this.drawingContext.globalCompositeOperation = currBlend;
};

p5.Renderer2D.prototype.copy = function () {
  var srcImage, sx, sy, sw, sh, dx, dy, dw, dh;
  if (arguments.length === 9) {
    srcImage = arguments[0];
    sx = arguments[1];
    sy = arguments[2];
    sw = arguments[3];
    sh = arguments[4];
    dx = arguments[5];
    dy = arguments[6];
    dw = arguments[7];
    dh = arguments[8];
  } else if (arguments.length === 8) {
    srcImage = this._pInst;
    sx = arguments[0];
    sy = arguments[1];
    sw = arguments[2];
    sh = arguments[3];
    dx = arguments[4];
    dy = arguments[5];
    dw = arguments[6];
    dh = arguments[7];
  } else {
    throw new Error('Signature not supported');
  }
  p5.Renderer2D._copyHelper(srcImage, sx, sy, sw, sh, dx, dy, dw, dh);
};

p5.Renderer2D._copyHelper =
function (srcImage, sx, sy, sw, sh, dx, dy, dw, dh) {
  var s = srcImage.canvas.width / srcImage.width;
  this.drawingContext.drawImage(srcImage.canvas,
    s * sx, s * sy, s * sw, s * sh, dx, dy, dw, dh);
};

p5.Renderer2D.prototype.get = function(x, y, w, h) {
  if (x === undefined && y === undefined &&
      w === undefined && h === undefined){
    x = 0;
    y = 0;
    w = this.width;
    h = this.height;
  } else if (w === undefined && h === undefined) {
    w = 1;
    h = 1;
  }

  if(x > this.width || y > this.height || x < 0 || y < 0){
    return [0, 0, 0, 255];
  }

  var ctx = this._pInst || this;

  var pd = ctx.pixelDensity;

  this.loadPixels.call(ctx);

  if (w === 1 && h === 1){

    return [
      ctx.pixels[pd*4*(y*this.width+x)],
      ctx.pixels[pd*(4*(y*this.width+x)+1)],
      ctx.pixels[pd*(4*(y*this.width+x)+2)],
      ctx.pixels[pd*(4*(y*this.width+x)+3)]
    ];
  } else {
    var sx = x * pd;
    var sy = y * pd;
    //auto constrain the width and height to
    //dimensions of the source image
    var dw = Math.min(w, ctx.width);
    var dh = Math.min(h, ctx.height);
    var sw = dw * pd;
    var sh = dh * pd;

    var region = new p5.Image(dw, dh);
    region.canvas.getContext('2d').drawImage(this.canvas, sx, sy, sw, sh,
      0, 0, dw, dh);

    return region;
  }
};

p5.Renderer2D.prototype.loadPixels = function () {
  var pd = this.pixelDensity || this._pInst.pixelDensity;
  var w = this.width * pd;
  var h = this.height * pd;
  var imageData = this.drawingContext.getImageData(0, 0, w, h);
  // @todo this should actually set pixels per object, so diff buffers can
  // have diff pixel arrays.
  if (this._pInst) {
    this._pInst._setProperty('imageData', imageData);
    this._pInst._setProperty('pixels', imageData.data);
  } else { // if called by p5.Image
    this._setProperty('imageData', imageData);
    this._setProperty('pixels', imageData.data);
  }
};

p5.Renderer2D.prototype.set = function (x, y, imgOrCol) {
  if (imgOrCol instanceof p5.Image) {
    this.drawingContext.save();
    this.drawingContext.setTransform(1, 0, 0, 1, 0, 0);
    this.drawingContext.scale(this._pInst.pixelDensity,
      this._pInst.pixelDensity);
    this.drawingContext.drawImage(imgOrCol.canvas, x, y);
    this.loadPixels.call(this._pInst);
    this.drawingContext.restore();
  } else {
    var ctx = this._pInst || this;
    var r = 0, g = 0, b = 0, a = 0;
    var idx = 4*((y * ctx.pixelDensity) *
      (this.width * ctx.pixelDensity) + (x * ctx.pixelDensity));
    if (!ctx.imageData) {
      ctx.loadPixels.call(ctx);
    }
    if (typeof imgOrCol === 'number') {
      if (idx < ctx.pixels.length) {
        r = imgOrCol;
        g = imgOrCol;
        b = imgOrCol;
        a = 255;
        //this.updatePixels.call(this);
      }
    }
    else if (imgOrCol instanceof Array) {
      if (imgOrCol.length < 4) {
        throw new Error('pixel array must be of the form [R, G, B, A]');
      }
      if (idx < ctx.pixels.length) {
        r = imgOrCol[0];
        g = imgOrCol[1];
        b = imgOrCol[2];
        a = imgOrCol[3];
        //this.updatePixels.call(this);
      }
    } else if (imgOrCol instanceof p5.Color) {
      if (idx < ctx.pixels.length) {
        r = imgOrCol.rgba[0];
        g = imgOrCol.rgba[1];
        b = imgOrCol.rgba[2];
        a = imgOrCol.rgba[3];
        //this.updatePixels.call(this);
      }
    }
    // loop over pixelDensity * pixelDensity
    for (var i = 0; i < ctx.pixelDensity; i++) {
      for (var j = 0; j < ctx.pixelDensity; j++) {
        // loop over
        idx = 4*((y * ctx.pixelDensity + j) * this.width *
          ctx.pixelDensity + (x * ctx.pixelDensity + i));
        ctx.pixels[idx] = r;
        ctx.pixels[idx+1] = g;
        ctx.pixels[idx+2] = b;
        ctx.pixels[idx+3] = a;
      }
    }
  }
};

p5.Renderer2D.prototype.updatePixels = function (x, y, w, h) {
  var pd = this.pixelDensity || this._pInst.pixelDensity;
  if (x === undefined &&
      y === undefined &&
      w === undefined &&
      h === undefined) {
    x = 0;
    y = 0;
    w = this.width;
    h = this.height;
  }
  w *= pd;
  h *= pd;

  if (this._pInst) {
    this.drawingContext.putImageData(this._pInst.imageData, x, y, 0, 0, w, h);
  } else {
    this.drawingContext.putImageData(this.imageData, x, y, 0, 0, w, h);
  }
};

//////////////////////////////////////////////
// SHAPE | 2D Primitives
//////////////////////////////////////////////

/**
 * Generate a cubic Bezier representing an arc on the unit circle of total
 * angle `size` radians, beginning `start` radians above the x-axis. Up to
 * four of these curves are combined to make a full arc.
 *
 * See www.joecridge.me/bezier.pdf for an explanation of the method.
 */
p5.Renderer2D.prototype._acuteArcToBezier =
  function _acuteArcToBezier(start, size) {
  // Evauate constants.
  var alpha = size / 2.0,
    cos_alpha = Math.cos(alpha),
    sin_alpha = Math.sin(alpha),
    cot_alpha = 1.0 / Math.tan(alpha),
    phi = start + alpha,  // This is how far the arc needs to be rotated.
    cos_phi = Math.cos(phi),
    sin_phi = Math.sin(phi),
    lambda = (4.0 - cos_alpha) / 3.0,
    mu = sin_alpha + (cos_alpha - lambda) * cot_alpha;

  // Return rotated waypoints.
  return {
    ax: Math.cos(start),
    ay: Math.sin(start),
    bx: lambda * cos_phi + mu * sin_phi,
    by: lambda * sin_phi - mu * cos_phi,
    cx: lambda * cos_phi - mu * sin_phi,
    cy: lambda * sin_phi + mu * cos_phi,
    dx: Math.cos(start + size),
    dy: Math.sin(start + size)
  };
};

p5.Renderer2D.prototype.arc =
  function(x, y, w, h, start, stop, mode) {
  var ctx = this.drawingContext;
  var vals = canvas.arcModeAdjust(x, y, w, h, this._ellipseMode);
  var rx = vals.w / 2.0;
  var ry = vals.h / 2.0;
  var epsilon = 0.00001;  // Smallest visible angle on displays up to 4K.
  var arcToDraw = 0;
  var curves = [];

  // Create curves
  while(stop - start > epsilon) {
    arcToDraw = Math.min(stop - start, constants.HALF_PI);
    curves.push(this._acuteArcToBezier(start, arcToDraw));
    start += arcToDraw;
  }

  // Fill curves
  if (this._doFill) {
    ctx.beginPath();
    curves.forEach(function (curve, index) {
      if (index === 0) {
        ctx.moveTo(vals.x + curve.ax * rx, vals.y + curve.ay * ry);
      }
      ctx.bezierCurveTo(vals.x + curve.bx * rx, vals.y + curve.by * ry,
                        vals.x + curve.cx * rx, vals.y + curve.cy * ry,
                        vals.x + curve.dx * rx, vals.y + curve.dy * ry);
    });
    if (mode === constants.PIE || mode == null) {
      ctx.lineTo(vals.x, vals.y);
    }
    ctx.closePath();
    ctx.fill();
  }

  // Stroke curves
  if (this._doStroke) {
    ctx.beginPath();
    curves.forEach(function (curve, index) {
      if (index === 0) {
        ctx.moveTo(vals.x + curve.ax * rx, vals.y + curve.ay * ry);
      }
      ctx.bezierCurveTo(vals.x + curve.bx * rx, vals.y + curve.by * ry,
                        vals.x + curve.cx * rx, vals.y + curve.cy * ry,
                        vals.x + curve.dx * rx, vals.y + curve.dy * ry);
    });
    if (mode === constants.PIE) {
      ctx.lineTo(vals.x, vals.y);
      ctx.closePath();
    } else if (mode === constants.CHORD) {
      ctx.closePath();
    }
    ctx.stroke();
  }
  return this;
};

p5.Renderer2D.prototype.ellipse = function(x, y, w, h) {
  var ctx = this.drawingContext;
  var doFill = this._doFill, doStroke = this._doStroke;
  if (doFill && !doStroke) {
    if(ctx.fillStyle === styleEmpty) {
      return this;
    }
  } else if (!doFill && doStroke) {
    if(ctx.strokeStyle === styleEmpty) {
      return this;
    }
  }
  var vals = canvas.modeAdjust(x, y, w, h, this._ellipseMode);
  var kappa = 0.5522847498,
    ox = (vals.w / 2) * kappa, // control point offset horizontal
    oy = (vals.h / 2) * kappa, // control point offset vertical
    xe = vals.x + vals.w,      // x-end
    ye = vals.y + vals.h,      // y-end
    xm = vals.x + vals.w / 2,  // x-middle
    ym = vals.y + vals.h / 2;  // y-middle
  ctx.beginPath();
  ctx.moveTo(vals.x, ym);
  ctx.bezierCurveTo(vals.x, ym - oy, xm - ox, vals.y, xm, vals.y);
  ctx.bezierCurveTo(xm + ox, vals.y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, vals.x, ym + oy, vals.x, ym);
  ctx.closePath();
  if (doFill) {
    ctx.fill();
  }
  if (doStroke) {
    ctx.stroke();
  }
};

p5.Renderer2D.prototype.line = function(x1, y1, x2, y2) {
  var ctx = this.drawingContext;
  if (!this._doStroke) {
    return this;
  } else if(ctx.strokeStyle === styleEmpty){
    return this;
  }
  // Translate the line by (0.5, 0.5) to draw it crisp
  if (ctx.lineWidth % 2 === 1) {
    ctx.translate(0.5, 0.5);
  }
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  if (ctx.lineWidth % 2 === 1) {
    ctx.translate(-0.5, -0.5);
  }
  return this;
};

p5.Renderer2D.prototype.point = function(x, y) {
  var ctx = this.drawingContext;
  var s = ctx.strokeStyle;
  var f = ctx.fillStyle;
  if (!this._doStroke) {
    return this;
  } else if(ctx.strokeStyle === styleEmpty){
    return this;
  }
  x = Math.round(x);
  y = Math.round(y);
  ctx.fillStyle = s;
  if (ctx.lineWidth > 1) {
    ctx.beginPath();
    ctx.arc(
      x,
      y,
      ctx.lineWidth / 2,
      0,
      constants.TWO_PI,
      false
    );
    ctx.fill();
  } else {
    ctx.fillRect(x, y, 1, 1);
  }
  ctx.fillStyle = f;
};

p5.Renderer2D.prototype.quad =
  function(x1, y1, x2, y2, x3, y3, x4, y4) {
  var ctx = this.drawingContext;
  var doFill = this._doFill, doStroke = this._doStroke;
  if (doFill && !doStroke) {
    if(ctx.fillStyle === styleEmpty) {
      return this;
    }
  } else if (!doFill && doStroke) {
    if(ctx.strokeStyle === styleEmpty) {
      return this;
    }
  }
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x4, y4);
  ctx.closePath();
  if (doFill) {
    ctx.fill();
  }
  if (doStroke) {
    ctx.stroke();
  }
  return this;
};

p5.Renderer2D.prototype.rect = function(x, y, w, h, tl, tr, br, bl) {
  var ctx = this.drawingContext;
  var doFill = this._doFill, doStroke = this._doStroke;
  if (doFill && !doStroke) {
    if(ctx.fillStyle === styleEmpty) {
      return this;
    }
  } else if (!doFill && doStroke) {
    if(ctx.strokeStyle === styleEmpty) {
      return this;
    }
  }
  var vals = canvas.modeAdjust(x, y, w, h, this._rectMode);
  // Translate the line by (0.5, 0.5) to draw a crisp rectangle border
  if (this._doStroke && ctx.lineWidth % 2 === 1) {
    ctx.translate(0.5, 0.5);
  }
  ctx.beginPath();

  if (typeof tl === 'undefined') {
    // No rounded corners
    ctx.rect(vals.x, vals.y, vals.w, vals.h);
  } else {
    // At least one rounded corner
    // Set defaults when not specified
    if (typeof tr === 'undefined') { tr = tl; }
    if (typeof br === 'undefined') { br = tr; }
    if (typeof bl === 'undefined') { bl = br; }

    // Cache and compute several values
    var _x = vals.x;
    var _y = vals.y;
    var _w = vals.w;
    var _h = vals.h;
    var hw = _w / 2;
    var hh = _h / 2;

    // Clip radii
    if (_w < 2 * tl) { tl = hw; }
    if (_h < 2 * tl) { tl = hh; }
    if (_w < 2 * tr) { tr = hw; }
    if (_h < 2 * tr) { tr = hh; }
    if (_w < 2 * br) { br = hw; }
    if (_h < 2 * br) { br = hh; }
    if (_w < 2 * bl) { bl = hw; }
    if (_h < 2 * bl) { bl = hh; }

    // Draw shape
    ctx.beginPath();
    ctx.moveTo(_x + tl, _y);
    ctx.arcTo(_x + _w, _y, _x + _w, _y + _h, tr);
    ctx.arcTo(_x + _w, _y + _h, _x, _y + _h, br);
    ctx.arcTo(_x, _y + _h, _x, _y, bl);
    ctx.arcTo(_x, _y, _x + _w, _y, tl);
    ctx.closePath();
  }
  if (this._doFill) {
    ctx.fill();
  }
  if (this._doStroke) {
    ctx.stroke();
  }
  if (this._doStroke && ctx.lineWidth % 2 === 1) {
    ctx.translate(-0.5, -0.5);
  }
  return this;
};

p5.Renderer2D.prototype.triangle = function(x1, y1, x2, y2, x3, y3) {
  var ctx = this.drawingContext;
  var doFill = this._doFill, doStroke = this._doStroke;
  if (doFill && !doStroke) {
    if(ctx.fillStyle === styleEmpty) {
      return this;
    }
  } else if (!doFill && doStroke) {
    if(ctx.strokeStyle === styleEmpty) {
      return this;
    }
  }
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  if (doFill) {
    ctx.fill();
  }
  if (doStroke) {
    ctx.stroke();
  }
};

p5.Renderer2D.prototype.endShape =
function (mode, vertices, isCurve, isBezier,
    isQuadratic, isContour, shapeKind) {
  if (vertices.length === 0) {
    return this;
  }
  if (!this._doStroke && !this._doFill) {
    return this;
  }
  var closeShape = mode === constants.CLOSE;
  var v;
  if (closeShape && !isContour) {
    vertices.push(vertices[0]);
  }
  var i, j;
  var numVerts = vertices.length;
  if (isCurve && (shapeKind === constants.POLYGON || shapeKind === null)) {
    if (numVerts > 3) {
      var b = [], s = 1 - this._curveTightness;
      this.drawingContext.beginPath();
      this.drawingContext.moveTo(vertices[1][0], vertices[1][1]);
      for (i = 1; i + 2 < numVerts; i++) {
        v = vertices[i];
        b[0] = [
          v[0],
          v[1]
        ];
        b[1] = [
          v[0] + (s * vertices[i + 1][0] - s * vertices[i - 1][0]) / 6,
          v[1] + (s * vertices[i + 1][1] - s * vertices[i - 1][1]) / 6
        ];
        b[2] = [
          vertices[i + 1][0] +
          (s * vertices[i][0]-s * vertices[i + 2][0]) / 6,
          vertices[i + 1][1]+(s * vertices[i][1] - s*vertices[i + 2][1]) / 6
        ];
        b[3] = [
          vertices[i + 1][0],
          vertices[i + 1][1]
        ];
        this.drawingContext.bezierCurveTo(b[1][0],b[1][1],
          b[2][0],b[2][1],b[3][0],b[3][1]);
      }
      if (closeShape) {
        this.drawingContext.lineTo(vertices[i + 1][0], vertices[i + 1][1]);
      }
      this._doFillStrokeClose();
    }
  } else if (isBezier&&(shapeKind===constants.POLYGON ||shapeKind === null)) {
    this.drawingContext.beginPath();
    for (i = 0; i < numVerts; i++) {
      if (vertices[i].isVert) {
        if (vertices[i].moveTo) {
          this.drawingContext.moveTo(vertices[i][0], vertices[i][1]);
        } else {
          this.drawingContext.lineTo(vertices[i][0], vertices[i][1]);
        }
      } else {
        this.drawingContext.bezierCurveTo(vertices[i][0], vertices[i][1],
          vertices[i][2], vertices[i][3], vertices[i][4], vertices[i][5]);
      }
    }
    this._doFillStrokeClose();
  } else if (isQuadratic &&
    (shapeKind === constants.POLYGON || shapeKind === null)) {
    this.drawingContext.beginPath();
    for (i = 0; i < numVerts; i++) {
      if (vertices[i].isVert) {
        if (vertices[i].moveTo) {
          this.drawingContext.moveTo([0], vertices[i][1]);
        } else {
          this.drawingContext.lineTo(vertices[i][0], vertices[i][1]);
        }
      } else {
        this.drawingContext.quadraticCurveTo(vertices[i][0], vertices[i][1],
          vertices[i][2], vertices[i][3]);
      }
    }
    this._doFillStrokeClose();
  } else {
    if (shapeKind === constants.POINTS) {
      for (i = 0; i < numVerts; i++) {
        v = vertices[i];
        if (this._doStroke) {
          this._pInst.stroke(v[6]);
        }
        this._pInst.point(v[0], v[1]);
      }
    } else if (shapeKind === constants.LINES) {
      for (i = 0; i + 1 < numVerts; i += 2) {
        v = vertices[i];
        if (this._doStroke) {
          this._pInst.stroke(vertices[i + 1][6]);
        }
        this._pInst.line(v[0], v[1], vertices[i + 1][0], vertices[i + 1][1]);
      }
    } else if (shapeKind === constants.TRIANGLES) {
      for (i = 0; i + 2 < numVerts; i += 3) {
        v = vertices[i];
        this.drawingContext.beginPath();
        this.drawingContext.moveTo(v[0], v[1]);
        this.drawingContext.lineTo(vertices[i + 1][0], vertices[i + 1][1]);
        this.drawingContext.lineTo(vertices[i + 2][0], vertices[i + 2][1]);
        this.drawingContext.lineTo(v[0], v[1]);
        if (this._doFill) {
          this._pInst.fill(vertices[i + 2][5]);
          this.drawingContext.fill();
        }
        if (this._doStroke) {
          this._pInst.stroke(vertices[i + 2][6]);
          this.drawingContext.stroke();
        }
        this.drawingContext.closePath();
      }
    } else if (shapeKind === constants.TRIANGLE_STRIP) {
      for (i = 0; i + 1 < numVerts; i++) {
        v = vertices[i];
        this.drawingContext.beginPath();
        this.drawingContext.moveTo(vertices[i + 1][0], vertices[i + 1][1]);
        this.drawingContext.lineTo(v[0], v[1]);
        if (this._doStroke) {
          this._pInst.stroke(vertices[i + 1][6]);
        }
        if (this._doFill) {
          this._pInst.fill(vertices[i + 1][5]);
        }
        if (i + 2 < numVerts) {
          this.drawingContext.lineTo(vertices[i + 2][0], vertices[i + 2][1]);
          if (this._doStroke) {
            this._pInst.stroke(vertices[i + 2][6]);
          }
          if (this._doFill) {
            this._pInst.fill(vertices[i + 2][5]);
          }
        }
        this._doFillStrokeClose();
      }
    } else if (shapeKind === constants.TRIANGLE_FAN) {
      if (numVerts > 2) {
        this.drawingContext.beginPath();
        this.drawingContext.moveTo(vertices[0][0], vertices[0][1]);
        this.drawingContext.lineTo(vertices[1][0], vertices[1][1]);
        this.drawingContext.lineTo(vertices[2][0], vertices[2][1]);
        if (this._doFill) {
          this._pInst.fill(vertices[2][5]);
        }
        if (this._doStroke) {
          this._pInst.stroke(vertices[2][6]);
        }
        this._doFillStrokeClose();
        for (i = 3; i < numVerts; i++) {
          v = vertices[i];
          this.drawingContext.beginPath();
          this.drawingContext.moveTo(vertices[0][0], vertices[0][1]);
          this.drawingContext.lineTo(vertices[i - 1][0], vertices[i - 1][1]);
          this.drawingContext.lineTo(v[0], v[1]);
          if (this._doFill) {
            this._pInst.fill(v[5]);
          }
          if (this._doStroke) {
            this._pInst.stroke(v[6]);
          }
          this._doFillStrokeClose();
        }
      }
    } else if (shapeKind === constants.QUADS) {
      for (i = 0; i + 3 < numVerts; i += 4) {
        v = vertices[i];
        this.drawingContext.beginPath();
        this.drawingContext.moveTo(v[0], v[1]);
        for (j = 1; j < 4; j++) {
          this.drawingContext.lineTo(vertices[i + j][0], vertices[i + j][1]);
        }
        this.drawingContext.lineTo(v[0], v[1]);
        if (this._doFill) {
          this._pInst.fill(vertices[i + 3][5]);
        }
        if (this._doStroke) {
          this._pInst.stroke(vertices[i + 3][6]);
        }
        this._doFillStrokeClose();
      }
    } else if (shapeKind === constants.QUAD_STRIP) {
      if (numVerts > 3) {
        for (i = 0; i + 1 < numVerts; i += 2) {
          v = vertices[i];
          this.drawingContext.beginPath();
          if (i + 3 < numVerts) {
            this.drawingContext.moveTo(vertices[i + 2][0], vertices[i+2][1]);
            this.drawingContext.lineTo(v[0], v[1]);
            this.drawingContext.lineTo(vertices[i + 1][0], vertices[i+1][1]);
            this.drawingContext.lineTo(vertices[i + 3][0], vertices[i+3][1]);
            if (this._doFill) {
              this._pInst.fill(vertices[i + 3][5]);
            }
            if (this._doStroke) {
              this._pInst.stroke(vertices[i + 3][6]);
            }
          } else {
            this.drawingContext.moveTo(v[0], v[1]);
            this.drawingContext.lineTo(vertices[i + 1][0], vertices[i+1][1]);
          }
          this._doFillStrokeClose();
        }
      }
    } else {
      this.drawingContext.beginPath();
      this.drawingContext.moveTo(vertices[0][0], vertices[0][1]);
      for (i = 1; i < numVerts; i++) {
        v = vertices[i];
        if (v.isVert) {
          if (v.moveTo) {
            this.drawingContext.moveTo(v[0], v[1]);
          } else {
            this.drawingContext.lineTo(v[0], v[1]);
          }
        }
      }
      this._doFillStrokeClose();
    }
  }
  isCurve = false;
  isBezier = false;
  isQuadratic = false;
  isContour = false;
  if (closeShape) {
    vertices.pop();
  }
  return this;
};
//////////////////////////////////////////////
// SHAPE | Attributes
//////////////////////////////////////////////

p5.Renderer2D.prototype.noSmooth = function() {
  if ('imageSmoothingEnabled' in this.drawingContext) {
    this.drawingContext.imageSmoothingEnabled = false;
  }
  else if ('mozImageSmoothingEnabled' in this.drawingContext) {
    this.drawingContext.mozImageSmoothingEnabled = false;
  }
  else if ('webkitImageSmoothingEnabled' in this.drawingContext) {
    this.drawingContext.webkitImageSmoothingEnabled = false;
  }
  else if ('msImageSmoothingEnabled' in this.drawingContext) {
    this.drawingContext.msImageSmoothingEnabled = false;
  }
  return this;
};

p5.Renderer2D.prototype.smooth = function() {
  if ('imageSmoothingEnabled' in this.drawingContext) {
    this.drawingContext.imageSmoothingEnabled = true;
  }
  else if ('mozImageSmoothingEnabled' in this.drawingContext) {
    this.drawingContext.mozImageSmoothingEnabled = true;
  }
  else if ('webkitImageSmoothingEnabled' in this.drawingContext) {
    this.drawingContext.webkitImageSmoothingEnabled = true;
  }
  else if ('msImageSmoothingEnabled' in this.drawingContext) {
    this.drawingContext.msImageSmoothingEnabled = true;
  }
  return this;
};

p5.Renderer2D.prototype.strokeCap = function(cap) {
  if (cap === constants.ROUND ||
    cap === constants.SQUARE ||
    cap === constants.PROJECT) {
    this.drawingContext.lineCap = cap;
  }
  return this;
};

p5.Renderer2D.prototype.strokeJoin = function(join) {
  if (join === constants.ROUND ||
    join === constants.BEVEL ||
    join === constants.MITER) {
    this.drawingContext.lineJoin = join;
  }
  return this;
};

p5.Renderer2D.prototype.strokeWeight = function(w) {
  if (typeof w === 'undefined' || w === 0) {
    // hack because lineWidth 0 doesn't work
    this.drawingContext.lineWidth = 0.0001;
  } else {
    this.drawingContext.lineWidth = w;
  }
  return this;
};

p5.Renderer2D.prototype._getFill = function(){
  return this.drawingContext.fillStyle;
};

p5.Renderer2D.prototype._getStroke = function(){
  return this.drawingContext.strokeStyle;
};

//////////////////////////////////////////////
// SHAPE | Curves
//////////////////////////////////////////////
p5.Renderer2D.prototype.bezier = function (x1, y1, x2, y2, x3, y3, x4, y4) {
  this._pInst.beginShape();
  this._pInst.vertex(x1, y1);
  this._pInst.bezierVertex(x2, y2, x3, y3, x4, y4);
  this._pInst.endShape();
  return this;
};

p5.Renderer2D.prototype.curve = function (x1, y1, x2, y2, x3, y3, x4, y4) {
  this._pInst.beginShape();
  this._pInst.curveVertex(x1, y1);
  this._pInst.curveVertex(x2, y2);
  this._pInst.curveVertex(x3, y3);
  this._pInst.curveVertex(x4, y4);
  this._pInst.endShape();
  return this;
};

//////////////////////////////////////////////
// SHAPE | Vertex
//////////////////////////////////////////////

p5.Renderer2D.prototype._doFillStrokeClose = function () {
  if (this._doFill) {
    this.drawingContext.fill();
  }
  if (this._doStroke) {
    this.drawingContext.stroke();
  }
  this.drawingContext.closePath();
};

//////////////////////////////////////////////
// TRANSFORM
//////////////////////////////////////////////

p5.Renderer2D.prototype.applyMatrix =
function(n00, n01, n02, n10, n11, n12) {
  this.drawingContext.transform(n00, n01, n02, n10, n11, n12);
};

p5.Renderer2D.prototype.resetMatrix = function() {
  this.drawingContext.setTransform(1, 0, 0, 1, 0, 0);
  this.drawingContext.scale(this._pInst.pixelDensity,
                            this._pInst.pixelDensity);
  return this;
};

p5.Renderer2D.prototype.rotate = function(r) {
  this.drawingContext.rotate(r);
};

p5.Renderer2D.prototype.scale = function(x,y) {
  this.drawingContext.scale(x, y);
  return this;
};

p5.Renderer2D.prototype.shearX = function(angle) {
  if (this._pInst._angleMode === constants.DEGREES) {
    angle = this._pInst.radians(angle);
  }
  this.drawingContext.transform(1, 0, this._pInst.tan(angle), 1, 0, 0);
  return this;
};

p5.Renderer2D.prototype.shearY = function(angle) {
  if (this._pInst._angleMode === constants.DEGREES) {
    angle = this._pInst.radians(angle);
  }
  this.drawingContext.transform(1, this._pInst.tan(angle), 0, 1, 0, 0);
  return this;
};

p5.Renderer2D.prototype.translate = function(x, y) {
  this.drawingContext.translate(x, y);
  return this;
};

//////////////////////////////////////////////
// TYPOGRAPHY
//
//////////////////////////////////////////////

p5.Renderer2D.prototype.text = function (str, x, y, maxWidth, maxHeight) {

  var p = this._pInst, cars, n, ii, jj, line, testLine,
    testWidth, words, totalHeight, baselineHacked,
    finalMaxHeight = Number.MAX_VALUE;

  // baselineHacked: (HACK)
  // A temporary fix to conform to Processing's implementation
  // of BASELINE vertical alignment in a bounding box

  if (!(this._doFill || this._doStroke)) {
    return;
  }

  if (typeof str !== 'string') {
    str = str.toString();
  }

  str = str.replace(/(\t)/g, '  ');
  cars = str.split('\n');

  if (typeof maxWidth !== 'undefined') {

    totalHeight = 0;
    for (ii = 0; ii < cars.length; ii++) {
      line = '';
      words = cars[ii].split(' ');
      for (n = 0; n < words.length; n++) {
        testLine = line + words[n] + ' ';
        testWidth = this.textWidth(testLine);
        if (testWidth > maxWidth) {
          line = words[n] + ' ';
          totalHeight += p.textLeading();
        } else {
          line = testLine;
        }
      }
    }

    if (this._rectMode === constants.CENTER) {

      x -= maxWidth / 2;
      y -= maxHeight / 2;
    }

    switch (this.drawingContext.textAlign) {

    case constants.CENTER:
      x += maxWidth / 2;
      break;
    case constants.RIGHT:
      x += maxWidth;
      break;
    }

    if (typeof maxHeight !== 'undefined') {

      switch (this.drawingContext.textBaseline) {
      case constants.BOTTOM:
        y += (maxHeight - totalHeight);
        break;
      case constants._CTX_MIDDLE:
        y += (maxHeight - totalHeight) / 2;
        break;
      case constants.BASELINE:
        baselineHacked = true;
        this.drawingContext.textBaseline = constants.TOP;
        break;
      }

      // remember the max-allowed y-position for any line (fix to #928)
      finalMaxHeight = (y + maxHeight) - p.textAscent();
    }

    for (ii = 0; ii < cars.length; ii++) {

      line = '';
      words = cars[ii].split(' ');
      for (n = 0; n < words.length; n++) {
        testLine = line + words[n] + ' ';
        testWidth = this.textWidth(testLine);
        if (testWidth > maxWidth && line.length > 0) {
          this._renderText(p, line, x, y, finalMaxHeight);
          line = words[n] + ' ';
          y += p.textLeading();
        } else {
          line = testLine;
        }
      }

      this._renderText(p, line, x, y, finalMaxHeight);
      y += p.textLeading();
    }
  }
  else {
    for (jj = 0; jj < cars.length; jj++) {

      this._renderText(p, cars[jj], x, y, finalMaxHeight);
      y += p.textLeading();
    }
  }

  if (baselineHacked) {
    this.drawingContext.textBaseline = constants.BASELINE;
  }

  return p;
};

p5.Renderer2D.prototype._renderText = function(p, line, x, y, maxY) {

  if (y >= maxY) {
    return; // don't render lines beyond our maxY position
  }

  p.push(); // fix to #803

  if (!this._isOpenType()) {  // a system/browser font

    // no stroke unless specified by user
    if (this._doStroke && this._strokeSet) {

      this.drawingContext.strokeText(line, x, y);
    }

    if (this._doFill) {

      // if fill hasn't been set by user, use default text fill
      this.drawingContext.fillStyle =  this._fillSet ?
        this.drawingContext.fillStyle : constants._DEFAULT_TEXT_FILL;

      this.drawingContext.fillText(line, x, y);
    }
  }
  else { // an opentype font, let it handle the rendering

    this._textFont._renderPath(line, x, y);
  }

  p.pop();

  return p;
};

p5.Renderer2D.prototype.textWidth = function(s) {

  if (this._isOpenType()) {

    return this._textFont._textWidth(s);
  }

  return this.drawingContext.measureText(s).width;
};

p5.Renderer2D.prototype.textAlign = function(h, v) {

  if (arguments.length) {

    if (h === constants.LEFT ||
      h === constants.RIGHT ||
      h === constants.CENTER) {

      this.drawingContext.textAlign = h;
    }

    if (v === constants.TOP ||
      v === constants.BOTTOM ||
      v === constants.CENTER ||
      v === constants.BASELINE) {

      if (v === constants.CENTER) {
        this.drawingContext.textBaseline = constants._CTX_MIDDLE;
      } else {
        this.drawingContext.textBaseline = v;
      }
    }

    return this._pInst;

  } else {

    var valign = this.drawingContext.textBaseline;

    if (valign === constants._CTX_MIDDLE) {

      valign = constants.CENTER;
    }

    return {

      horizontal: this.drawingContext.textAlign,
      vertical: valign
    };
  }
};

p5.Renderer2D.prototype._applyTextProperties = function() {

  var font, p = this._pInst;

  this._setProperty('_textAscent', null);
  this._setProperty('_textDescent', null);

  font = this._textFont;

  if (this._isOpenType()) {

    font = this._textFont.font.familyName;
    this._setProperty('_textStyle', this._textFont.font.styleName);
  }

  this.drawingContext.font = this._textStyle + ' ' +
  this._textSize + 'px ' + font;

  return p;
};


//////////////////////////////////////////////
// STRUCTURE
//////////////////////////////////////////////

p5.Renderer2D.prototype.push = function() {
  this.drawingContext.save();
};

p5.Renderer2D.prototype.pop = function() {
  this.drawingContext.restore();
};

module.exports = p5.Renderer2D;

},{"../image/filters":65,"./canvas":46,"./constants":47,"./core":48,"./p5.Renderer":54}],56:[function(_dereq_,module,exports){
/**
 * @module Rendering
 * @submodule Rendering
 * @for p5
 */

var p5 = _dereq_('./core');
var constants = _dereq_('./constants');
_dereq_('./p5.Graphics');
_dereq_('./p5.Renderer2D');
_dereq_('../3d/p5.Renderer3D');
var defaultId = 'defaultCanvas0'; // this gets set again in createCanvas

/**
 * Creates a canvas element in the document, and sets the dimensions of it
 * in pixels. This method should be called only once at the start of setup.
 * Calling createCanvas more than once in a sketch will result in very
 * unpredicable behavior. If you want more than one drawing canvas
 * you could use createGraphics (hidden by default but it can be shown).<br>
 * The system variables width and height are set by the parameters passed
 * to this function. If createCanvas() is not used, the window will be
 * given a default size of 100x100 pixels.
 *
 * @method createCanvas
 * @param  {Number} w width of the canvas
 * @param  {Number} h height of the canvas
 * @param  optional:{String} renderer 'p2d' | 'webgl'
 * @return {Object} canvas generated
 * @example
 * <div>
 * <code>
 * function setup() {
 *   createCanvas(100, 50);
 *   background(153);
 *   line(0, 0, width, height);
 * }
 * </code>
 * </div>
 */

p5.prototype.createCanvas = function(w, h, renderer) {
  //optional: renderer, otherwise defaults to p2d
  var r = renderer || constants.P2D;
  var isDefault, c;

  //4th arg (isDefault) used when called onLoad,
  //otherwise hidden to the public api
  if(arguments[3]){
    isDefault =
    (typeof arguments[3] === 'boolean') ? arguments[3] : false;
  }

  if(r === constants.WEBGL){
    c = document.getElementById(defaultId);
    if(c){ //if defaultCanvas already exists
      c.parentNode.removeChild(c); //replace the existing defaultCanvas
    }
    c = document.createElement('canvas');
    c.id = defaultId;
  }
  else {
    if (isDefault) {
      c = document.createElement('canvas');
      var i = 0;
      while (document.getElementById('defaultCanvas'+i)) {
        i++;
      }
      defaultId = 'defaultCanvas'+i;
      c.id = defaultId;
    } else { // resize the default canvas if new one is created
      c = this.canvas;
    }
  }

  // set to invisible if still in setup (to prevent flashing with manipulate)
  if (!this._setupDone) {
    c.className += ' p5_hidden'; // tag to show later
    c.style.visibility='hidden';
  }

  if (this._userNode) { // user input node case
    this._userNode.appendChild(c);
  } else {
    document.body.appendChild(c);
  }



  // Init our graphics renderer
  //webgl mode
  if (r === constants.WEBGL) {
    this._setProperty('_renderer', new p5.Renderer3D(c, this, true));
    this._isdefaultGraphics = true;
  }
  //P2D mode
  else {
    if (!this._isdefaultGraphics) {
      this._setProperty('_renderer', new p5.Renderer2D(c, this, true));
      this._isdefaultGraphics = true;
    }
  }
  this._renderer.resize(w, h);
  this._renderer._applyDefaults();
  if (isDefault) { // only push once
    this._elements.push(this._renderer);
  }
  return this._renderer;
};

/**
 * Resizes the canvas to given width and height. Note that the
 * canvas will be cleared so anything drawn previously in setup
 * or draw will disappear on resize. Setup will not be called
 * again.
 * @method resizeCanvas
 * @example
 * <div class="norender"><code>
 * function setup() {
 *   createCanvas(windowWidth, windowHeight);
 * }
 *
 * function draw() {
 *  background(0, 100, 200);
 * }
 *
 * function windowResized() {
 *   resizeCanvas(windowWidth, windowHeight);
 * }
 * </code></div>
 */
p5.prototype.resizeCanvas = function (w, h, noRedraw) {
  if (this._renderer) {
    this._renderer.resize(w, h);
    this._renderer._applyDefaults();
    if (!noRedraw) {
      this.redraw();
    }
  }
};


/**
 * Removes the default canvas for a p5 sketch that doesn't
 * require a canvas
 * @method noCanvas
 * @example
 * <div>
 * <code>
 * function setup() {
 *   noCanvas();
 * }
 * </code>
 * </div>
 */
p5.prototype.noCanvas = function() {
  if (this.canvas) {
    this.canvas.parentNode.removeChild(this.canvas);
  }
};

/**
 * Creates and returns a new p5.Renderer object. Use this class if you need
 * to draw into an off-screen graphics buffer. The two parameters define the
 * width and height in pixels.
 *
 * @method createGraphics
 * @param  {Number} w width of the offscreen graphics buffer
 * @param  {Number} h height of the offscreen graphics buffer
 * @param {String} renderer either 'p2d' or 'webgl'.
 * undefined defaults to p2d
 * @return {Object} offscreen graphics buffer
 * @example
 * <div>
 * <code>
 * var pg;
 * function setup() {
 *   createCanvas(100, 100);
 *   pg = createGraphics(100, 100);
 * }
 * function draw() {
 *   background(200);
 *   pg.background(100);
 *   pg.noStroke();
 *   pg.ellipse(pg.width/2, pg.height/2, 50, 50);
 *   image(pg, 50, 50);
 *   image(pg, 0, 0, 50, 50);
 * }
 * </code>
 * </div>
 */
p5.prototype.createGraphics = function(w, h, renderer){
  return new p5.Graphics(w, h, renderer, this);
};

/**
 * Blends the pixels in the display window according to the defined mode.
 * There is a choice of the following modes to blend the source pixels (A)
 * with the ones of pixels already in the display window (B):
 * <ul>
 * <li><code>BLEND</code> - linear interpolation of colours: C =
 * A*factor + B. This is the default blending mode.</li>
 * <li><code>ADD</code> - sum of A and B</li>
 * <li><code>DARKEST</code> - only the darkest colour succeeds: C =
 * min(A*factor, B).</li>
 * <li><code>LIGHTEST</code> - only the lightest colour succeeds: C =
 * max(A*factor, B).</li>
 * <li><code>DIFFERENCE</code> - subtract colors from underlying image.</li>
 * <li><code>EXCLUSION</code> - similar to <code>DIFFERENCE</code>, but less
 * extreme.</li>
 * <li><code>MULTIPLY</code> - multiply the colors, result will always be
 * darker.</li>
 * <li><code>SCREEN</code> - opposite multiply, uses inverse values of the
 * colors.</li>
 * <li><code>REPLACE</code> - the pixels entirely replace the others and
 * don't utilize alpha (transparency) values.</li>
 * <li><code>OVERLAY</code> - mix of <code>MULTIPLY</code> and <code>SCREEN
 * </code>. Multiplies dark values, and screens light values.</li>
 * <li><code>HARD_LIGHT</code> - <code>SCREEN</code> when greater than 50%
 * gray, <code>MULTIPLY</code> when lower.</li>
 * <li><code>SOFT_LIGHT</code> - mix of <code>DARKEST</code> and
 * <code>LIGHTEST</code>. Works like <code>OVERLAY</code>, but not as harsh.
 * </li>
 * <li><code>DODGE</code> - lightens light tones and increases contrast,
 * ignores darks.</li>
 * <li><code>BURN</code> - darker areas are applied, increasing contrast,
 * ignores lights.</li>
 * </ul>
 *
 * @method blendMode
 * @param  {String/Constant} mode blend mode to set for canvas
 * @example
 * <div>
 * <code>
 * blendMode(LIGHTEST);
 * strokeWeight(30);
 * stroke(80, 150, 255);
 * line(25, 25, 75, 75);
 * stroke(255, 50, 50);
 * line(75, 25, 25, 75);
 * </code>
 * </div>
 * <div>
 * <code>
 * blendMode(MULTIPLY);
 * strokeWeight(30);
 * stroke(80, 150, 255);
 * line(25, 25, 75, 75);
 * stroke(255, 50, 50);
 * line(75, 25, 25, 75);
 * </code>
 * </div>
 */
p5.prototype.blendMode = function(mode) {
  if (mode === constants.BLEND || mode === constants.DARKEST ||
    mode === constants.LIGHTEST || mode === constants.DIFFERENCE ||
    mode === constants.MULTIPLY || mode === constants.EXCLUSION ||
    mode === constants.SCREEN || mode === constants.REPLACE ||
    mode === constants.OVERLAY || mode === constants.HARD_LIGHT ||
    mode === constants.SOFT_LIGHT || mode === constants.DODGE ||
    mode === constants.BURN || mode === constants.ADD ||
    mode === constants.NORMAL) {
    this._renderer.blendMode(mode);
  } else {
    throw new Error('Mode '+mode+' not recognized.');
  }
};

module.exports = p5;

},{"../3d/p5.Renderer3D":36,"./constants":47,"./core":48,"./p5.Graphics":53,"./p5.Renderer2D":55}],57:[function(_dereq_,module,exports){



},{}],58:[function(_dereq_,module,exports){
/**
 * @module Structure
 * @submodule Structure
 * @for p5
 * @requires core
 */

'use strict';

var p5 = _dereq_('./core');

p5.prototype.exit = function() {
  throw 'exit() not implemented, see remove()';
};
/**
 * <p>Stops p5.js from continuously executing the code within draw().
 * If loop() is called, the code in draw() begins to run continuously again.
 * If using noLoop() in setup(), it should be the last line inside the block.
 * </p>
 *
 * <p>When noLoop() is used, it's not possible to manipulate or access the
 * screen inside event handling functions such as mousePressed() or
 * keyPressed(). Instead, use those functions to call redraw() or loop(),
 * which will run draw(), which can update the screen properly. This means
 * that when noLoop() has been called, no drawing can happen, and functions
 * like saveFrame() or loadPixels() may not be used.</p>
 *
 * <p>Note that if the sketch is resized, redraw() will be called to update
 * the sketch, even after noLoop() has been specified. Otherwise, the sketch
 * would enter an odd state until loop() was called.</p>
 *
 * @method noLoop
 * @example
 * <div><code>
 * function setup() {
 *   createCanvas(100, 100);
 *   background(200);
 *   noLoop();
 * }

 * function draw() {
 *   line(10, 10, 90, 90);
 * }
 * </code></div>
 *
 * <div><code>
 * var x = 0;
 * function setup() {
 *   createCanvas(100, 100);
 * }
 *
 * function draw() {
 *   background(204);
 *   x = x + 0.1;
 *   if (x > width) {
 *     x = 0;
 *   }
 *   line(x, 0, x, height);
 * }
 *
 * function mousePressed() {
 *   noLoop();
 * }
 *
 * function mouseReleased() {
 *   loop();
 * }
 * </code></div>
 */
p5.prototype.noLoop = function() {
  this._loop = false;
};
/**
 * By default, p5.js loops through draw() continuously, executing the code
 * within it. However, the draw() loop may be stopped by calling noLoop().
 * In that case, the draw() loop can be resumed with loop().
 *
 * @method loop
 * @example
 * <div><code>
 * var x = 0;
 * function setup() {
 *   createCanvas(100, 100);
 *   noLoop();
 * }
 *
 * function draw() {
 *   background(204);
 *   x = x + 0.1;
 *   if (x > width) {
 *     x = 0;
 *   }
 *   line(x, 0, x, height);
 * }
 *
 * function mousePressed() {
 *   loop();
 * }
 *
 * function mouseReleased() {
 *   noLoop();
 * }
 * </code></div>
 */

p5.prototype.loop = function() {
  this._loop = true;
  this._draw();
};

/**
 * The push() function saves the current drawing style settings and
 * transformations, while pop() restores these settings. Note that these
 * functions are always used together. They allow you to change the style
 * and transformation settings and later return to what you had. When a new
 * state is started with push(), it builds on the current style and transform
 * information. The push() and pop() functions can be embedded to provide
 * more control. (See the second example for a demonstration.)
 * <br><br>
 * push() stores information related to the current transformation state
 * and style settings controlled by the following functions: fill(),
 * stroke(), tint(), strokeWeight(), strokeCap(), strokeJoin(),
 * imageMode(), rectMode(), ellipseMode(), colorMode(), textAlign(),
 * textFont(), textMode(), textSize(), textLeading().
 *
 * @method push
 * @example
 * <div>
 * <code>
 * ellipse(0, 50, 33, 33);  // Left circle
 *
 * push();  // Start a new drawing state
 * strokeWeight(10);
 * fill(204, 153, 0);
 * translate(50, 0);
 * ellipse(0, 50, 33, 33);  // Middle circle
 * pop();  // Restore original state
 *
 * ellipse(100, 50, 33, 33);  // Right circle
 * </code>
 * </div>
 * <div>
 * <code>
 * ellipse(0, 50, 33, 33);  // Left circle
 *
 * push();  // Start a new drawing state
 * strokeWeight(10);
 * fill(204, 153, 0);
 * ellipse(33, 50, 33, 33);  // Left-middle circle
 *
 * push();  // Start another new drawing state
 * stroke(0, 102, 153);
 * ellipse(66, 50, 33, 33);  // Right-middle circle
 * pop();  // Restore previous state
 *
 * pop();  // Restore original state
 *
 * ellipse(100, 50, 33, 33);  // Right circle
 * </code>
 * </div>
 */
p5.prototype.push = function () {
  this._renderer.push();
  this._styles.push({
    _doStroke: this._renderer._doStroke,
    _doFill: this._renderer._doFill,
    _tint: this._renderer._tint,
    _imageMode: this._renderer._imageMode,
    _rectMode: this._renderer._rectMode,
    _ellipseMode: this._renderer._ellipseMode,
    _colorMode: this._renderer._colorMode,
    _textFont: this._renderer._textFont,
    _textLeading: this._renderer._textLeading,
    _textSize: this._renderer._textSize,
    _textStyle: this._renderer._textStyle
  });
};

/**
 * The push() function saves the current drawing style settings and
 * transformations, while pop() restores these settings. Note that these
 * functions are always used together. They allow you to change the style
 * and transformation settings and later return to what you had. When a new
 * state is started with push(), it builds on the current style and transform
 * information. The push() and pop() functions can be embedded to provide
 * more control. (See the second example for a demonstration.)
 * <br><br>
 * push() stores information related to the current transformation state
 * and style settings controlled by the following functions: fill(),
 * stroke(), tint(), strokeWeight(), strokeCap(), strokeJoin(),
 * imageMode(), rectMode(), ellipseMode(), colorMode(), textAlign(),
 * textFont(), textMode(), textSize(), textLeading().
 *
 * @method pop
 * @example
 * <div>
 * <code>
 * ellipse(0, 50, 33, 33);  // Left circle
 *
 * push();  // Start a new drawing state
 * translate(50, 0);
 * strokeWeight(10);
 * fill(204, 153, 0);
 * ellipse(0, 50, 33, 33);  // Middle circle
 * pop();  // Restore original state
 *
 * ellipse(100, 50, 33, 33);  // Right circle
 * </code>
 * </div>
 * <div>
 * <code>
 * ellipse(0, 50, 33, 33);  // Left circle
 *
 * push();  // Start a new drawing state
 * strokeWeight(10);
 * fill(204, 153, 0);
 * ellipse(33, 50, 33, 33);  // Left-middle circle
 *
 * push();  // Start another new drawing state
 * stroke(0, 102, 153);
 * ellipse(66, 50, 33, 33);  // Right-middle circle
 * pop();  // Restore previous state
 *
 * pop();  // Restore original state
 *
 * ellipse(100, 50, 33, 33);  // Right circle
 * </code>
 * </div>
 */
p5.prototype.pop = function () {
  this._renderer.pop();
  var lastS = this._styles.pop();
  for(var prop in lastS){
    this._renderer[prop] = lastS[prop];
  }
};

p5.prototype.pushStyle = function() {
  throw new Error('pushStyle() not used, see push()');
};

p5.prototype.popStyle = function() {
  throw new Error('popStyle() not used, see pop()');
};

/**
 *
 * Executes the code within draw() one time. This functions allows the
 * program to update the display window only when necessary, for example
 * when an event registered by mousePressed() or keyPressed() occurs.
 *
 * In structuring a program, it only makes sense to call redraw() within
 * events such as mousePressed(). This is because redraw() does not run
 * draw() immediately (it only sets a flag that indicates an update is
 * needed).
 *
 * The redraw() function does not work properly when called inside draw().
 * To enable/disable animations, use loop() and noLoop().
 *
 * @method redraw
 * @example
 *   <div><code>
 *     var x = 0;
 *
 *     function setup() {
 *       createCanvas(100, 100);
 *       noLoop();
 *     }
 *
 *     function draw() {
 *       background(204);
 *       line(x, 0, x, height);
 *     }
 *
 *     function mousePressed() {
 *       x += 1;
 *       redraw();
 *     }
 *   </code></div>
 */
p5.prototype.redraw = function () {
  var userSetup = this.setup || window.setup;
  var userDraw = this.draw || window.draw;
  if (typeof userDraw === 'function') {
    this.push();
    if (typeof userSetup === 'undefined') {
      this.scale(this.pixelDensity, this.pixelDensity);
    }
    var self = this;
    this._registeredMethods.pre.forEach(function (f) {
      f.call(self);
    });
    userDraw();
    this._registeredMethods.post.forEach(function (f) {
      f.call(self);
    });
    this.pop();
  }
};

p5.prototype.size = function() {
  var s = 'size() is not a valid p5 function, to set the size of the ';
  s += 'drawing canvas, please use createCanvas() instead';
  throw s;
};


module.exports = p5;

},{"./core":48}],59:[function(_dereq_,module,exports){
/**
 * @module Transform
 * @submodule Transform
 * @for p5
 * @requires core
 * @requires constants
 */


'use strict';

var p5 = _dereq_('./core');
var constants = _dereq_('./constants');

/**
 * Multiplies the current matrix by the one specified through the parameters.
 * This is very slow because it will try to calculate the inverse of the
 * transform, so avoid it whenever possible.
 *
 * @method applyMatrix
 * @param  {Number} n00 numbers which define the 3x2 matrix to be multiplied
 * @param  {Number} n01 numbers which define the 3x2 matrix to be multiplied
 * @param  {Number} n02 numbers which define the 3x2 matrix to be multiplied
 * @param  {Number} n10 numbers which define the 3x2 matrix to be multiplied
 * @param  {Number} n11 numbers which define the 3x2 matrix to be multiplied
 * @param  {Number} n12 numbers which define the 3x2 matrix to be multiplied
 * @return {p5}         the p5 object
 * @example
 * <div>
 * <code>
 * // Example in the works.
 * </code>
 * </div>
 */
p5.prototype.applyMatrix = function(n00, n01, n02, n10, n11, n12) {
  this._renderer.applyMatrix(n00, n01, n02, n10, n11, n12);
  return this;
};

p5.prototype.popMatrix = function() {
  throw new Error('popMatrix() not used, see pop()');
};

p5.prototype.printMatrix = function() {
  throw new Error('printMatrix() not implemented');
};

p5.prototype.pushMatrix = function() {
  throw new Error('pushMatrix() not used, see push()');
};

/**
 * Replaces the current matrix with the identity matrix.
 *
 * @method resetMatrix
 * @return {p5} the p5 object
 * @example
 * <div>
 * <code>
 * // Example in the works.
 * </code>
 * </div>
 */
p5.prototype.resetMatrix = function() {
  this._renderer.resetMatrix();
  return this;
};

/**
 * Rotates a shape the amount specified by the angle parameter. This
 * function accounts for angleMode, so angles can be entered in either
 * RADIANS or DEGREES.
 *
 * Objects are always rotated around their relative position to the
 * origin and positive numbers rotate objects in a clockwise direction.
 * Transformations apply to everything that happens after and subsequent
 * calls to the function accumulates the effect. For example, calling
 * rotate(HALF_PI) and then rotate(HALF_PI) is the same as rotate(PI).
 * All tranformations are reset when draw() begins again.
 *
 * Technically, rotate() multiplies the current transformation matrix
 * by a rotation matrix. This function can be further controlled by
 * the push() and pop().
 *
 * @method rotate
 * @param  {Number} angle the angle of rotation, specified in radians
 *                        or degrees, depending on current angleMode
 * @return {p5}           the p5 object
 * @example
 * <div>
 * <code>
 * translate(width/2, height/2);
 * rotate(PI/3.0);
 * rect(-26, -26, 52, 52);
 * </code>
 * </div>
 */
p5.prototype.rotate = function() {
  var r = arguments[0];
  if (this._angleMode === constants.DEGREES) {
    r = this.radians(r);
  }
  //in webgl mode
  if(arguments.length > 1){
    this._renderer.rotate(r, arguments[1]);
  }
  else {
    this._renderer.rotate(r);
  }
  return this;
};

/**
 * [rotateX description]
 * @param  {[type]} rad [description]
 * @return {[type]}     [description]
 */
p5.prototype.rotateX = function(rad) {
  var args = new Array(arguments.length);
  for (var i = 0; i < args.length; ++i) {
    args[i] = arguments[i];
  }
  if (this._renderer.isP3D) {
    this._validateParameters(
      'rotateX',
      args,
      [
        ['Number']
      ]
    );
    this._renderer.rotateX(rad);
  } else {
    throw 'not supported in p2d. Please use webgl mode';
  }
  return this;
};

/**
 * [rotateY description]
 * @param  {[type]} rad [description]
 * @return {[type]}     [description]
 */
p5.prototype.rotateY = function(rad) {
  if (this._renderer.isP3D) {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }
    this._validateParameters(
      'rotateY',
      args,
      [
        ['Number']
      ]
    );
    this._renderer.rotateY(rad);
  } else {
    throw 'not supported in p2d. Please use webgl mode';
  }
  return this;
};

/**
 * [rotateZ description]
 * @param  {[type]} rad [description]
 * @return {[type]}     [description]
 */
p5.prototype.rotateZ = function(rad) {
  if (this._renderer.isP3D) {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }
    this._validateParameters(
      'rotateZ',
      args,
      [
        ['Number']
      ]
    );
    this._renderer.rotateZ(rad);
  } else {
    throw 'not supported in p2d. Please use webgl mode';
  }
  return this;
};

/**
 * Increases or decreases the size of a shape by expanding and contracting
 * vertices. Objects always scale from their relative origin to the
 * coordinate system. Scale values are specified as decimal percentages.
 * For example, the function call scale(2.0) increases the dimension of a
 * shape by 200%.
 *
 * Transformations apply to everything that happens after and subsequent
 * calls to the function multiply the effect. For example, calling scale(2.0)
 * and then scale(1.5) is the same as scale(3.0). If scale() is called
 * within draw(), the transformation is reset when the loop begins again.
 *
 * Using this fuction with the z parameter requires using P3D as a
 * parameter for size(), as shown in the third example above. This function
 * can be further controlled with push() and pop().
 *
 * @method scale
 * @param  {Number | p5.Vector | Array} s
 *                      percent to scale the object, or percentage to
 *                      scale the object in the x-axis if multiple arguments
 *                      are given
 * @param  {Number} [y] percent to scale the object in the y-axis
 * @param  {Number} [z] percent to scale the object in the z-axis (webgl only)
 * @return {p5}         the p5 object
 * @example
 * <div>
 * <code>
 * translate(width/2, height/2);
 * rotate(PI/3.0);
 * rect(-26, -26, 52, 52);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * rect(30, 20, 50, 50);
 * scale(0.5, 1.3);
 * rect(30, 20, 50, 50);
 * </code>
 * </div>
 */
p5.prototype.scale = function() {
  var x,y,z;
  var args = new Array(arguments.length);
  for(var i = 0; i < args.length; i++) {
    args[i] = arguments[i];
  }
  if(args[0] instanceof p5.Vector){
    x = args[0].x;
    y = args[0].y;
    z = args[0].z;
  }
  else if(args[0] instanceof Array){
    x = args[0][0];
    y = args[0][1];
    z = args[0][2] || 1;
  }
  else {
    if(args.length === 1){
      x = y = z = args[0];
    }
    else {
      x = args[0];
      y = args[1];
      z = args[2] || 1;
    }
  }

  if(this._renderer.isP3D){
    this._renderer.scale.call(this._renderer, x,y,z);
  }
  else {
    this._renderer.scale.call(this._renderer, x,y);
  }
  return this;
};

/**
 * Shears a shape around the x-axis the amount specified by the angle
 * parameter. Angles should be specified in the current angleMode.
 * Objects are always sheared around their relative position to the origin
 * and positive numbers shear objects in a clockwise direction.
 *
 * Transformations apply to everything that happens after and subsequent
 * calls to the function accumulates the effect. For example, calling
 * shearX(PI/2) and then shearX(PI/2) is the same as shearX(PI).
 * If shearX() is called within the draw(), the transformation is reset when
 * the loop begins again.
 *
 * Technically, shearX() multiplies the current transformation matrix by a
 * rotation matrix. This function can be further controlled by the
 * push() and pop() functions.
 *
 * @method shearX
 * @param  {Number} angle angle of shear specified in radians or degrees,
 *                        depending on current angleMode
 * @return {p5}           the p5 object
 * @example
 * <div>
 * <code>
 * translate(width/4, height/4);
 * shearX(PI/4.0);
 * rect(0, 0, 30, 30);
 * </code>
 * </div>
 */
p5.prototype.shearX = function(angle) {
  if (this._angleMode === constants.DEGREES) {
    angle = this.radians(angle);
  }
  this._renderer.shearX(angle);
  return this;
};

/**
 * Shears a shape around the y-axis the amount specified by the angle
 * parameter. Angles should be specified in the current angleMode. Objects
 * are always sheared around their relative position to the origin and
 * positive numbers shear objects in a clockwise direction.
 *
 * Transformations apply to everything that happens after and subsequent
 * calls to the function accumulates the effect. For example, calling
 * shearY(PI/2) and then shearY(PI/2) is the same as shearY(PI). If
 * shearY() is called within the draw(), the transformation is reset when
 * the loop begins again.
 *
 * Technically, shearY() multiplies the current transformation matrix by a
 * rotation matrix. This function can be further controlled by the
 * push() and pop() functions.
 *
 * @method shearY
 * @param  {Number} angle angle of shear specified in radians or degrees,
 *                        depending on current angleMode
 * @return {p5}           the p5 object
 * @example
 * <div>
 * <code>
 * translate(width/4, height/4);
 * shearY(PI/4.0);
 * rect(0, 0, 30, 30);
 * </code>
 * </div>
 */
p5.prototype.shearY = function(angle) {
  if (this._angleMode === constants.DEGREES) {
    angle = this.radians(angle);
  }
  this._renderer.shearY(angle);
  return this;
};

/**
 * Specifies an amount to displace objects within the display window.
 * The x parameter specifies left/right translation, the y parameter
 * specifies up/down translation.
 *
 * Transformations are cumulative and apply to everything that happens after
 * and subsequent calls to the function accumulates the effect. For example,
 * calling translate(50, 0) and then translate(20, 0) is the same as
 * translate(70, 0). If translate() is called within draw(), the
 * transformation is reset when the loop begins again. This function can be
 * further controlled by using push() and pop().
 *
 * @method translate
 * @param  {Number} x left/right translation
 * @param  {Number} y up/down translation
 * @return {p5}       the p5 object
 * @example
 * <div>
 * <code>
 * translate(30, 20);
 * rect(0, 0, 55, 55);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * rect(0, 0, 55, 55);  // Draw rect at original 0,0
 * translate(30, 20);
 * rect(0, 0, 55, 55);  // Draw rect at new 0,0
 * translate(14, 14);
 * rect(0, 0, 55, 55);  // Draw rect at new 0,0
 * </code>
 * </div>
 */
p5.prototype.translate = function(x, y, z) {
  var args = new Array(arguments.length);
  for (var i = 0; i < args.length; ++i) {
    args[i] = arguments[i];
  }

  if (this._renderer.isP3D) {
    this._validateParameters(
      'translate',
      args,
      [
        //p3d
        ['Number', 'Number', 'Number']
      ]
    );
    this._renderer.translate(x, y, z);
  } else {
    this._validateParameters(
      'translate',
      args,
      [
        //p2d
        ['Number', 'Number']
      ]
    );
    this._renderer.translate(x, y);
  }
  return this;
};

module.exports = p5;

},{"./constants":47,"./core":48}],60:[function(_dereq_,module,exports){

},{"./constants":47,"./core":48}],61:[function(_dereq_,module,exports){

},{"../core/core":48}],62:[function(_dereq_,module,exports){
/**
 * @module Events
 * @submodule Keyboard
 * @for p5
 * @requires core
 */

'use strict';

var p5 = _dereq_('../core/core');

/**
 * Holds the key codes of currently pressed keys.
 * @private
 */
var downKeys = {};

/**
 * The boolean system variable keyIsPressed is true if any key is pressed
 * and false if no keys are pressed.
 *
 * @property keyIsPressed
 * @example
 * <div>
 * <code>
 * var value = 0;
 * function draw() {
 *   if (keyIsPressed === true) {
 *     fill(0);
 *   } else {
 *     fill(255);
 *   }
 *   rect(25, 25, 50, 50);
 * }
 * </code>
 * </div>
 */
p5.prototype.isKeyPressed = false;
p5.prototype.keyIsPressed = false; // khan

/**
 * The system variable key always contains the value of the most recent
 * key on the keyboard that was typed. To get the proper capitalization, it
 * is best to use it within keyTyped(). For non-ASCII keys, use the keyCode
 * variable.
 *
 * @property key
 * @example
 * <div><code>
 * // Click any key to display it!
 * // (Not Guaranteed to be Case Sensitive)
 * function setup() {
 *   fill(245, 123, 158);
 *   textSize(50);
 * }
 *
 * function draw() {
 *   background(200);
 *   text(key, 33,65); // Display last key pressed.
 * }
 * </div></code>
 */
p5.prototype.key = '';

/**
 * The variable keyCode is used to detect special keys such as BACKSPACE,
 * DELETE, ENTER, RETURN, TAB, ESCAPE, SHIFT, CONTROL, OPTION, ALT, UP_ARROW,
 * DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW.
 *
 * @property keyCode
 * @example
 * <div><code>
 * var fillVal = 126;
 * function draw() {
 *   fill(fillVal);
 *   rect(25, 25, 50, 50);
 * }
 *
 * function keyPressed() {
 *   if (keyCode == UP_ARROW) {
 *     fillVal = 255;
 *   } else if (keyCode == DOWN_ARROW) {
 *     fillVal = 0;
 *   }
 *   return false; // prevent default
 * }
 * </code></div>
 */
p5.prototype.keyCode = 0;

/**
 * The keyPressed() function is called once every time a key is pressed. The
 * keyCode for the key that was pressed is stored in the keyCode variable.
 * <br><br>
 * For non-ASCII keys, use the keyCode variable. You can check if the keyCode
 * equals BACKSPACE, DELETE, ENTER, RETURN, TAB, ESCAPE, SHIFT, CONTROL,
 * OPTION, ALT, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW.
 * <br><br>
 * For ASCII keys that was pressed is stored in the key variable. However, it
 * does not distinguish between uppercase and lowercase. For this reason, it
 * is recommended to use keyTyped() to read the key variable, in which the
 * case of the variable will be distinguished.
 * <br><br>
 * Because of how operating systems handle key repeats, holding down a key
 * may cause multiple calls to keyTyped() (and keyReleased() as well). The
 * rate of repeat is set by the operating system and how each computer is
 * configured.<br><br>
 * Browsers may have different default
 * behaviors attached to various key events. To prevent any default
 * behavior for this event, add "return false" to the end of the method.
 *
 * @method keyPressed
 * @example
 * <div>
 * <code>
 * var value = 0;
 * function draw() {
 *   fill(value);
 *   rect(25, 25, 50, 50);
 * }
 * function keyPressed() {
 *   if (value === 0) {
 *     value = 255;
 *   } else {
 *     value = 0;
 *   }
 * }
 * </code>
 * </div>
 * <div>
 * <code>
 * var value = 0;
 * function draw() {
 *   fill(value);
 *   rect(25, 25, 50, 50);
 * }
 * function keyPressed() {
 *   if (keyCode === LEFT_ARROW) {
 *     value = 255;
 *   } else if (keyCode === RIGHT_ARROW) {
 *     value = 0;
 *   }
 * }
 * </code>
 * </div>
 * <div class="norender">
 * <code>
 * function keyPressed(){
 *   // Do something
 *   return false; // prevent any default behaviour
 * }
 * </code>
 * </div>
 */
p5.prototype._onkeydown = function (e) {
  this._setProperty('isKeyPressed', true);
  this._setProperty('keyIsPressed', true);
  this._setProperty('keyCode', e.which);
  downKeys[e.which] = true;
  var key = String.fromCharCode(e.which);
  if (!key) {
    key = e.which;
  }
  this._setProperty('key', key);
  var keyPressed = this.keyPressed || window.keyPressed;
  if (typeof keyPressed === 'function' && !e.charCode) {
    var executeDefault = keyPressed(e);
    if(executeDefault === false) {
      e.preventDefault();
    }
  }
};
/**
 * The keyReleased() function is called once every time a key is released.
 * See key and keyCode for more information.<br><br>
 * Browsers may have different default
 * behaviors attached to various key events. To prevent any default
 * behavior for this event, add "return false" to the end of the method.
 *
 * @method keyReleased
 * @example
 * <div>
 * <code>
 * var value = 0;
 * function draw() {
 *   fill(value);
 *   rect(25, 25, 50, 50);
 * }
 * function keyReleased() {
 *   if (value === 0) {
 *     value = 255;
 *   } else {
 *     value = 0;
 *   }
 *   return false; // prevent any default behavior
 * }
 * </code>
 * </div>
 */
p5.prototype._onkeyup = function (e) {
  var keyReleased = this.keyReleased || window.keyReleased;
  this._setProperty('isKeyPressed', false);
  this._setProperty('keyIsPressed', false);
  downKeys[e.which] = false;
  //delete this._downKeys[e.which];
  var key = String.fromCharCode(e.which);
  if (!key) {
    key = e.which;
  }
  this._setProperty('key', key);
  this._setProperty('keyCode', e.which);
  if (typeof keyReleased === 'function') {
    var executeDefault = keyReleased(e);
    if(executeDefault === false) {
      e.preventDefault();
    }
  }
};

/**
 * The keyTyped() function is called once every time a key is pressed, but
 * action keys such as Ctrl, Shift, and Alt are ignored. The most recent
 * key pressed will be stored in the key variable.
 * <br><br>
 * Because of how operating systems handle key repeats, holding down a key
 * will cause multiple calls to keyTyped(), the rate is set by the operating
 * system and how each computer is configured.<br><br>
 * Browsers may have different default
 * behaviors attached to various key events. To prevent any default
 * behavior for this event, add "return false" to the end of the method.
 *
 * @method keyTyped
 * @example
 * <div>
 * <code>
 * var value = 0;
 * function draw() {
 *   fill(value);
 *   rect(25, 25, 50, 50);
 * }
 * function keyTyped() {
 *   if (key === 'a') {
 *     value = 255;
 *   } else if (key === 'b') {
 *     value = 0;
 *   }
 *   return false; // prevent any default behavior
 * }
 * </code>
 * </div>
 */
p5.prototype._onkeypress = function (e) {
  this._setProperty('keyCode', e.which);
  this._setProperty('key', String.fromCharCode(e.which));
  var keyTyped = this.keyTyped || window.keyTyped;
  if (typeof keyTyped === 'function') {
    var executeDefault = keyTyped(e);
    if(executeDefault === false) {
      e.preventDefault();
    }
  }
};
/**
 * The onblur function is called when the user is no longer focused
 * on the p5 element. Because the keyup events will no fire if the user is
 * not focused on the element we must assume all keys currently down have
 * been released.
 */
p5.prototype._onblur = function (e) {
  downKeys = {};
};

/**
 * The keyIsDown function checks if the key is currently down, i.e. pressed.
 * It can be used if you have an object that moves, and you want several keys
 * to be able to affect its behaviour simultaneously, such as moving a
 * sprite diagonally. You can put in any number representing the keyCode of
 * the key, or use any of the variable keyCode names listed
 * <a href="http://p5js.org/reference/#p5/keyCode">here</a>.
 *
 * @method keyIsDown
 * @param {Number}          code The key to check for.
 * @return {Boolean}        whether key is down or not
 * @example
 * <div><code>
 * var x = 100;
 * var y = 100;
 *
 * function setup() {
 *   createCanvas(512, 512);
 * }
 *
 * function draw() {
 *   if (keyIsDown(LEFT_ARROW))
 *     x-=5;
 *
 *   if (keyIsDown(RIGHT_ARROW))
 *     x+=5;
 *
 *   if (keyIsDown(UP_ARROW))
 *     y-=5;
 *
 *   if (keyIsDown(DOWN_ARROW))
 *     y+=5;
 *
 *   clear();
 *   fill(255, 0, 0);
 *   ellipse(x, y, 50, 50);
 * }
 * </code></div>
 */
p5.prototype.keyIsDown = function(code) {
  return downKeys[code];
};

module.exports = p5;

},{"../core/core":48}],63:[function(_dereq_,module,exports){

},{"../core/constants":47,"../core/core":48}],64:[function(_dereq_,module,exports){

},{"../core/core":48}],65:[function(_dereq_,module,exports){

},{}],66:[function(_dereq_,module,exports){
/**
 * @module Image
 * @submodule Image
 * @for p5
 * @requires core
 */

/**
 * This module defines the p5 methods for the p5.Image class
 * for drawing images to the main display canvas.
 */
'use strict';


var p5 = _dereq_('../core/core');

/* global frames:true */// This is not global, but JSHint is not aware that
// this module is implicitly enclosed with Browserify: this overrides the
// redefined-global error and permits using the name "frames" for the array
// of saved animation frames.
var frames = [];


/**
 * Creates a new p5.Image (the datatype for storing images). This provides a
 * fresh buffer of pixels to play with. Set the size of the buffer with the
 * width and height parameters.
 *
 * .pixels gives access to an array containing the values for all the pixels
 * in the display window.
 * These values are numbers. This array is the size (including an appropriate
 * factor for the pixelDensity) of the display window x4,
 * representing the R, G, B, A values in order for each pixel, moving from
 * left to right across each row, then down each column. See .pixels for
 * more info. It may also be simpler to use set() or get().
 * <br><br>
 * Before accessing the pixels of an image, the data must loaded with the
 * loadPixels()
 * function. After the array data has been modified, the updatePixels()
 * function must be run to update the changes.
 *
 * @method createImage
 * @param  {Integer} width  width in pixels
 * @param  {Integer} height height in pixels
 * @return {p5.Image}       the p5.Image object
 * @example
 * <div>
 * <code>
 * img = createImage(66, 66);
 * img.loadPixels();
 * for (i = 0; i < img.width; i++) {
 *   for (j = 0; j < img.height; j++) {
 *     img.set(i, j, color(0, 90, 102));
 *   }
 * }
 * img.updatePixels();
 * image(img, 17, 17);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * img = createImage(66, 66);
 * img.loadPixels();
 * for (i = 0; i < img.width; i++) {
 *   for (j = 0; j < img.height; j++) {
 *     img.set(i, j, color(0, 90, 102, i % img.width * 2));
 *   }
 * }
 * img.updatePixels();
 * image(img, 17, 17);
 * image(img, 34, 34);
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * var pink = color(255, 102, 204);
 * img = createImage(66, 66);
 * img.loadPixels();
 * var d = pixelDensity;
 * var halfImage = 4 * (width * d) * (height/2 * d);
 * for (var i = 0; i < halfImage; i+=4) {
 *   img.pixels[i] = red(pink);
 *   img.pixels[i+1] = green(pink);
 *   img.pixels[i+2] = blue(pink);
 *   img.pixels[i+3] = alpha(pink);
 * }
 * img.updatePixels();
 * image(img, 17, 17);
 * </code>
 * </div>
 */
p5.prototype.createImage = function(width, height) {
  return new p5.Image(width, height);
};

/**
 *  Save the current canvas as an image. In Safari, will open the
 *  image in the window and the user must provide their own
 *  filename on save-as. Other browsers will either save the
 *  file immediately, or prompt the user with a dialogue window.
 *
 *  @method saveCanvas
 *  @param  {[selectedCanvas]} canvas a variable representing a
 *                             specific html5 canvas (optional)
 *  @param  {[String]} filename
 *  @param  {[String]} extension 'jpg' or 'png'
 *  @example
 *  <div class='norender'><code>
 *  function setup() {
 *    var c = createCanvas(100, 100);
 *    background(255, 0, 0);
 *    saveCanvas(c, 'myCanvas', 'jpg');
 *  }
 *  </code></div>
 *  <div class='norender'><code>
 *  // note that this example has the same result as above
 *  // if no canvas is specified, defaults to main canvas
 *  function setup() {
 *    createCanvas(100, 100);
 *    background(255, 0, 0);
 *    saveCanvas('myCanvas', 'jpg');
 *  }
 *  </code></div>
 *  <div class='norender'><code>
 *  // all of the following are valid
 *  saveCanvas(c, 'myCanvas', 'jpg');
 *  saveCanvas(c, 'myCanvas');
 *  saveCanvas(c);
 *  saveCanvas('myCanvas', 'png');
 *  saveCanvas('myCanvas');
 *  saveCanvas();
 *  </code></div>
 */
p5.prototype.saveCanvas = function() {

  var cnv, filename, extension;
  if (arguments.length === 3) {
    cnv = arguments[0];
    filename = arguments[1];
    extension = arguments[2];
  } else if (arguments.length === 2) {
    if (typeof arguments[0] === 'object') {
      cnv = arguments[0];
      filename = arguments[1];
    } else {
      filename = arguments[0];
      extension = arguments[1];
    }
  } else if (arguments.length === 1) {
    if (typeof arguments[0] === 'object') {
      cnv = arguments[0];
    } else {
      filename = arguments[0];
    }
  }

  if (cnv instanceof p5.Element) {
    cnv = cnv.elt;
  }
  if (!(cnv instanceof HTMLCanvasElement)) {
    cnv = null;
  }

  if (!extension) {
    extension = p5.prototype._checkFileExtension(filename, extension)[1];
    if (extension === '') {
      extension = 'png';
    }
  }

  if (!cnv) {
    if (this._curElement && this._curElement.elt) {
      cnv = this._curElement.elt;
    }
  }

  if ( p5.prototype._isSafari() ) {
    var aText = 'Hello, Safari user!\n';
    aText += 'Now capturing a screenshot...\n';
    aText += 'To save this image,\n';
    aText += 'go to File --> Save As.\n';
    alert(aText);
    window.location.href = cnv.toDataURL();
  } else {
    var mimeType;
    if (typeof(extension) === 'undefined') {
      extension = 'png';
      mimeType = 'image/png';
    }
    else {
      switch(extension){
      case 'png':
        mimeType = 'image/png';
        break;
      case 'jpeg':
        mimeType = 'image/jpeg';
        break;
      case 'jpg':
        mimeType = 'image/jpeg';
        break;
      default:
        mimeType = 'image/png';
        break;
      }
    }
    var downloadMime = 'image/octet-stream';
    var imageData = cnv.toDataURL(mimeType);
    imageData = imageData.replace(mimeType, downloadMime);

    p5.prototype.downloadFile(imageData, filename, extension);
  }
};

/**
 *  Capture a sequence of frames that can be used to create a movie.
 *  Accepts a callback. For example, you may wish to send the frames
 *  to a server where they can be stored or converted into a movie.
 *  If no callback is provided, the browser will attempt to download
 *  all of the images that have just been created.
 *
 *  @method saveFrames
 *  @param  {[type]}   filename  [description]
 *  @param  {[type]}   extension [description]
 *  @param  {[type]}   _duration [description]
 *  @param  {[type]}   _fps      [description]
 *  @param  {[Function]} callback  [description]
 *  @return {[type]}             [description]
 */
p5.prototype.saveFrames = function(fName, ext, _duration, _fps, callback) {
  var duration = _duration || 3;
  duration = p5.prototype.constrain(duration, 0, 15);
  duration = duration * 1000;
  var fps = _fps || 15;
  fps = p5.prototype.constrain(fps, 0, 22);
  var count = 0;

  var makeFrame = p5.prototype._makeFrame;
  var cnv = this._curElement.elt;
  var frameFactory = setInterval(function(){
    makeFrame(fName + count, ext, cnv);
    count++;
  },1000/fps);

  setTimeout(function(){
    clearInterval(frameFactory);
    if (callback) {
      callback(frames);
    }
    else {
      for (var i = 0; i < frames.length; i++) {
        var f = frames[i];
        p5.prototype.downloadFile(f.imageData, f.filename, f.ext);
      }
    }
    frames = []; // clear frames
  }, duration + 0.01);
};

p5.prototype._makeFrame = function(filename, extension, _cnv) {
  var cnv;
  if (this) {
    cnv = this._curElement.elt;
  } else {
    cnv = _cnv;
  }
  var mimeType;
  if (!extension) {
    extension = 'png';
    mimeType = 'image/png';
  }
  else {
    switch(extension.toLowerCase()){
    case 'png':
      mimeType = 'image/png';
      break;
    case 'jpeg':
      mimeType = 'image/jpeg';
      break;
    case 'jpg':
      mimeType = 'image/jpeg';
      break;
    default:
      mimeType = 'image/png';
      break;
    }
  }
  var downloadMime = 'image/octet-stream';
  var imageData = cnv.toDataURL(mimeType);
  imageData = imageData.replace(mimeType, downloadMime);

  var thisFrame = {};
  thisFrame.imageData = imageData;
  thisFrame.filename = filename;
  thisFrame.ext = extension;
  frames.push(thisFrame);
};

module.exports = p5;

},{"../core/core":48}],67:[function(_dereq_,module,exports){

},{"../core/canvas":46,"../core/constants":47,"../core/core":48,"../core/error_helpers":51,"./filters":65}],68:[function(_dereq_,module,exports){
/**
 * @module Image
 * @submodule Image
 * @requires core
 * @requires constants
 * @requires filters
 */

/**
 * This module defines the p5.Image class and P5 methods for
 * drawing images to the main display canvas.
 */

'use strict';

var p5 = _dereq_('../core/core');
var Filters = _dereq_('./filters');

/*
 * Class methods
 */

/**
 * Creates a new p5.Image. A p5.Image is a canvas backed representation of an
 * image. p5 can display .gif, .jpg and .png images. Images may be displayed
 * in 2D and 3D space. Before an image is used, it must be loaded with the
 * loadImage() function. The p5.Image class contains fields for the width and
 * height of the image, as well as an array called pixels[] that contains the
 * values for every pixel in the image. The methods described below allow
 * easy access to the image's pixels and alpha channel and simplify the
 * process of compositing.
 *
 * Before using the pixels[] array, be sure to use the loadPixels() method on
 * the image to make sure that the pixel data is properly loaded.
 *
 * @class p5.Image
 * @constructor
 * @param {Number} width
 * @param {Number} height
 * @param {Object} pInst An instance of a p5 sketch.
 */
p5.Image = function(width, height){
  /**
   * Image width.
   * @property width
   */
  this.width = width;
  /**
   * Image height.
   * @property height
   */
  this.height = height;
  this.canvas = document.createElement('canvas');
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this.drawingContext = this.canvas.getContext('2d');
  this.pixelDensity = 1;
  /**
   * Array containing the values for all the pixels in the display window.
   * These values are numbers. This array is the size (include an appropriate
   * factor for pixelDensity) of the display window x4,
   * representing the R, G, B, A values in order for each pixel, moving from
   * left to right across each row, then down each column. Retina and other
   * high denisty displays may have more pixels[] (by a factor of
   * pixelDensity^2).
   * For example, if the image is 100x100 pixels, there will be 40,000. With
   * pixelDensity = 2, there will be 160,000. The first four values
   * (indices 0-3) in the array will be the R, G, B, A values of the pixel at
   * (0, 0). The second four values (indices 4-7) will contain the R, G, B, A
   * values of the pixel at (1, 0). More generally, to set values for a pixel
   * at (x, y):
   * <code><pre>var d = pixelDensity;
   * for (var i = 0; i < d; i++) {
   *   for (var j = 0; j < d; j++) {
   *     // loop over
   *     idx = 4*((y * d + j) * width * d + (x * d + i));
   *     pixels[idx] = r;
   *     pixels[idx+1] = g;
   *     pixels[idx+2] = b;
   *     pixels[idx+3] = a;
   *   }
   * }
   * </pre></code>
   * <br><br>
   * Before accessing this array, the data must loaded with the loadPixels()
   * function. After the array data has been modified, the updatePixels()
   * function must be run to update the changes.
   * @property pixels[]
   * @example
   * <div>
   * <code>
   * img = createImage(66, 66);
   * img.loadPixels();
   * for (i = 0; i < img.width; i++) {
   *   for (j = 0; j < img.height; j++) {
   *     img.set(i, j, color(0, 90, 102));
   *   }
   * }
   * img.updatePixels();
   * image(img, 17, 17);
   * </code>
   * </div>
   * <div>
   * <code>
   * var pink = color(255, 102, 204);
   * img = createImage(66, 66);
   * img.loadPixels();
   * for (var i = 0; i < 4*(width*height/2); i+=4) {
   *   img.pixels[i] = red(pink);
   *   img.pixels[i+1] = green(pink);
   *   img.pixels[i+2] = blue(pink);
   *   img.pixels[i+3] = alpha(pink);
   * }
   * img.updatePixels();
   * image(img, 17, 17);
   * </code>
   * </div>
   */
  this.pixels = [];
};

/**
 * Helper fxn for sharing pixel methods
 *
 */
p5.Image.prototype._setProperty = function (prop, value) {
  this[prop] = value;
};

/**
 * Loads the pixels data for this image into the [pixels] attribute.
 *
 * @method loadPixels
 */
p5.Image.prototype.loadPixels = function(){
  p5.Renderer2D.prototype.loadPixels.call(this);
};

/**
 * Updates the backing canvas for this image with the contents of
 * the [pixels] array.
 *
 * @method updatePixels
 * @param {Integer|undefined} x x-offset of the target update area for the
 *                              underlying canvas
 * @param {Integer|undefined} y y-offset of the target update area for the
 *                              underlying canvas
 * @param {Integer|undefined} w height of the target update area for the
 *                              underlying canvas
 * @param {Integer|undefined} h height of the target update area for the
 *                              underlying canvas
 */
p5.Image.prototype.updatePixels = function(x, y, w, h){
  p5.Renderer2D.prototype.updatePixels.call(this, x, y, w, h);
};

/**
 * Get a region of pixels from an image.
 *
 * If no params are passed, those whole image is returned,
 * if x and y are the only params passed a single pixel is extracted
 * if all params are passed a rectangle region is extracted and a p5.Image
 * is returned.
 *
 * Returns undefined if the region is outside the bounds of the image
 *
 * @method get
 * @param  {Number}               [x] x-coordinate of the pixel
 * @param  {Number}               [y] y-coordinate of the pixel
 * @param  {Number}               [w] width
 * @param  {Number}               [h] height
 * @return {Array/Color | p5.Image}     color of pixel at x,y in array format
 *                                    [R, G, B, A] or p5.Image
 */
p5.Image.prototype.get = function(x, y, w, h){
  return p5.Renderer2D.prototype.get.call(this, x, y, w, h);
};

/**
 * Set the color of a single pixel or write an image into
 * this p5.Image.
 *
 * Note that for a large number of pixels this will
 * be slower than directly manipulating the pixels array
 * and then calling updatePixels().
 *
 * @method set
 * @param {Number}              x x-coordinate of the pixel
 * @param {Number}              y y-coordinate of the pixel
 * @param {Number|Array|Object}   a grayscale value | pixel array |
 *                                a p5.Color | image to copy
 * @example
 * <div>
 * <code>
 * img = createImage(66, 66);
 * img.loadPixels();
 * for (i = 0; i < img.width; i++) {
 *   for (j = 0; j < img.height; j++) {
 *     img.set(i, j, color(0, 90, 102, i % img.width * 2));
 *   }
 * }
 * img.updatePixels();
 * image(img, 17, 17);
 * image(img, 34, 34);
 * </code>
 * </div>
 */
p5.Image.prototype.set = function(x, y, imgOrCol){
  p5.Renderer2D.prototype.set.call(this, x, y, imgOrCol);
};

/**
 * Resize the image to a new width and height. To make the image scale
 * proportionally, use 0 as the value for the wide or high parameter.
 * For instance, to make the width of an image 150 pixels, and change
 * the height using the same proportion, use resize(150, 0).
 *
 * @method resize
 * @param {Number} width the resized image width
 * @param {Number} height the resized image height
 * @example
 * <div><code>
 * var img;
 *
 * function setup() {
 *   img = loadImage("assets/rockies.jpg");
 * }

 * function draw() {
 *   image(img, 0, 0);
 * }
 *
 * function mousePressed() {
 *   img.resize(50, 100);
 * }
 * </code></div>
 */
p5.Image.prototype.resize = function(width, height){

  // Copy contents to a temporary canvas, resize the original
  // and then copy back.
  //
  // There is a faster approach that involves just one copy and swapping the
  // this.canvas reference. We could switch to that approach if (as i think
  // is the case) there an expectation that the user would not hold a
  // reference to the backing canvas of a p5.Image. But since we do not
  // enforce that at the moment, I am leaving in the slower, but safer
  // implementation.
  width = width || this.canvas.width;
  height = height || this.canvas.height;

  var tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;
  tempCanvas.getContext('2d').drawImage(this.canvas,
    0, 0, this.canvas.width, this.canvas.height,
    0, 0, tempCanvas.width, tempCanvas.height
  );


  // Resize the original canvas, which will clear its contents
  this.canvas.width = this.width = width;
  this.canvas.height = this.height = height;

  //Copy the image back

  this.drawingContext.drawImage(tempCanvas,
    0, 0, width, height,
    0, 0, width, height
  );

  if(this.pixels.length > 0){
    this.loadPixels();
  }
};

/**
 * Copies a region of pixels from one image to another. If no
 * srcImage is specified this is used as the source. If the source
 * and destination regions aren't the same size, it will
 * automatically resize source pixels to fit the specified
 * target region.
 *
 * @method copy
 * @param  {p5.Image|undefined} srcImage source image
 * @param  {Integer} sx X coordinate of the source's upper left corner
 * @param  {Integer} sy Y coordinate of the source's upper left corner
 * @param  {Integer} sw source image width
 * @param  {Integer} sh source image height
 * @param  {Integer} dx X coordinate of the destination's upper left corner
 * @param  {Integer} dy Y coordinate of the destination's upper left corner
 * @param  {Integer} dw destination image width
 * @param  {Integer} dh destination image height
 */
p5.Image.prototype.copy = function () {
  p5.prototype.copy.apply(this, arguments);
};

/**
 * Masks part of an image from displaying by loading another
 * image and using it's alpha channel as an alpha channel for
 * this image.
 *
 * @method mask
 * @param {p5.Image|undefined} srcImage source image
 *
 * TODO: - Accept an array of alpha values.
 *       - Use other channels of an image. p5 uses the
 *       blue channel (which feels kind of arbitrary). Note: at the
 *       moment this method does not match native processings original
 *       functionality exactly.
 *
 * http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/
 *
 */
p5.Image.prototype.mask = function(p5Image) {
  if(p5Image === undefined){
    p5Image = this;
  }
  var currBlend = this.drawingContext.globalCompositeOperation;

  var scaleFactor = 1;
  if (p5Image instanceof p5.Renderer) {
    scaleFactor = p5Image._pInst.pixelDensity;
  }

  var copyArgs = [
    p5Image,
    0,
    0,
    scaleFactor*p5Image.width,
    scaleFactor*p5Image.height,
    0,
    0,
    this.width,
    this.height
  ];

  this.drawingContext.globalCompositeOperation = 'destination-in';
  this.copy.apply(this, copyArgs);
  this.drawingContext.globalCompositeOperation = currBlend;
};

/**
 * Applies an image filter to a p5.Image
 *
 * @method filter
 * @param {String} operation one of threshold, gray, invert, posterize and
 *                           opaque see Filters.js for docs on each available
 *                           filter
 * @param {Number|undefined} value
 */
p5.Image.prototype.filter = function(operation, value) {
  Filters.apply(this.canvas, Filters[operation.toLowerCase()], value);
};

/**
 * Copies a region of pixels from one image to another, using a specified
 * blend mode to do the operation.
 *
 * @method blend
 * @param  {p5.Image|undefined} srcImage source image
 * @param  {Integer} sx X coordinate of the source's upper left corner
 * @param  {Integer} sy Y coordinate of the source's upper left corner
 * @param  {Integer} sw source image width
 * @param  {Integer} sh source image height
 * @param  {Integer} dx X coordinate of the destination's upper left corner
 * @param  {Integer} dy Y coordinate of the destination's upper left corner
 * @param  {Integer} dw destination image width
 * @param  {Integer} dh destination image height
 * @param  {Integer} blendMode the blend mode
 *
 * Available blend modes are: normal | multiply | screen | overlay |
 *            darken | lighten | color-dodge | color-burn | hard-light |
 *            soft-light | difference | exclusion | hue | saturation |
 *            color | luminosity
 *
 *
 * http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/
 *
 */
p5.Image.prototype.blend = function() {
  p5.prototype.blend.apply(this, arguments);
};

/**
 * Saves the image to a file and force the browser to download it.
 * Accepts two strings for filename and file extension
 * Supports png (default) and jpg.
 *
 * @method save
 * @param {String} filename give your file a name
 * @param  {String} extension 'png' or 'jpg'
 */
p5.Image.prototype.save = function(filename, extension) {
  var mimeType;
  if (!extension) {
    extension = 'png';
    mimeType = 'image/png';
  }
  else {
    // en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support
    switch(extension.toLowerCase()){
    case 'png':
      mimeType = 'image/png';
      break;
    case 'jpeg':
      mimeType = 'image/jpeg';
      break;
    case 'jpg':
      mimeType = 'image/jpeg';
      break;
    default:
      mimeType = 'image/png';
      break;
    }
  }
  var downloadMime = 'image/octet-stream';
  var imageData = this.canvas.toDataURL(mimeType);
  imageData = imageData.replace(mimeType, downloadMime);

  //Make the browser download the file
  p5.prototype.downloadFile(imageData, filename, extension);
};

module.exports = p5.Image;

},{"../core/core":48,"./filters":65}],69:[function(_dereq_,module,exports){

},{"../color/p5.Color":42,"../core/core":48,"./filters":65}],70:[function(_dereq_,module,exports){
/**
 * @module IO
 * @submodule Input
 * @for p5
 * @requires core
 * @requires reqwest
 */

'use strict';

var p5 = _dereq_('../core/core');
var reqwest = _dereq_('reqwest');
var opentype = _dereq_('opentype.js');
_dereq_('../core/error_helpers');

/**
 * Checks if we are in preload and returns the last arg which will be the
 * _decrementPreload function if called from a loadX() function.  Should
 * only be used in loadX() functions.
 * @private
 */
p5._getDecrementPreload = function() {
  var decrementPreload = arguments[arguments.length - 1];

  // when in preload decrementPreload will always be the last arg as it is set
  // with args.push() before invocation in _wrapPreload
  if ((window.preload || this.preload) &&
    typeof decrementPreload === 'function') {
    return decrementPreload;
  } else {
    return null;
  }
};

/**
 * Loads an opentype font file (.otf, .ttf) from a file or a URL,
 * and returns a PFont Object. This method is asynchronous,
 * meaning it may not finish before the next line in your sketch
 * is executed.
 * <br><br>
 * The path to the font should be relative to the HTML file
 * that links in your sketch. Loading an from a URL or other
 * remote location may be blocked due to your browser's built-in
 * security.
 *
 * @method loadFont
 * @param  {String}        path       name of the file or url to load
 * @param  {Function}      [callback] function to be executed after
 *                                    loadFont()
 *                                    completes
 * @return {Object}                   p5.Font object
 * @example
 *
 * <p>Calling loadFont() inside preload() guarantees that the load
 * operation will have completed before setup() and draw() are called.</p>
 *
 * <div><code>
 * var myFont;
 * function preload() {
 *   myFont = loadFont('assets/AvenirNextLTPro-Demi.otf');
 * }
 *
 * function setup() {
 *   fill('#ED225D');
 *   textFont(myFont);
 *   textSize(36);
 *   text('p5*js', 10, 50);
 * }
 * </code></div>
 *
 * <p>Outside of preload(), you may supply a callback function to handle the
 * object:</p>
 *
 * <div><code>
 * function setup() {
 *   loadFont('assets/AvenirNextLTPro-Demi.otf', drawText);
 * }
 *
 * function drawText(font) {
 *   fill('#ED225D');
 *   textFont(font, 36);
 *   text('p5*js', 10, 50);
 * }
 *
 * </code></div>
 *
 */
p5.prototype.loadFont = function(path, onSuccess, onError) {

  var p5Font = new p5.Font(this);
  var decrementPreload = p5._getDecrementPreload.apply(this, arguments);

  opentype.load(path, function(err, font) {

    if (err) {

      if ((typeof onError !== 'undefined') && (onError !== decrementPreload)) {
        return onError(err);
      }
      throw err;
    }

    p5Font.font = font;

    if (typeof onSuccess !== 'undefined') {
      onSuccess(p5Font);
    }
    if (decrementPreload && (onSuccess !== decrementPreload)) {
      decrementPreload();
    }

  });

  return p5Font;
};


//BufferedReader
p5.prototype.createInput = function() {
  // TODO
  throw 'not yet implemented';
};

p5.prototype.createReader = function() {
  // TODO
  throw 'not yet implemented';
};

p5.prototype.loadBytes = function() {
  // TODO
  throw 'not yet implemented';
};

/**
 * Loads a JSON file from a file or a URL, and returns an Object or Array.
 * This method is asynchronous, meaning it may not finish before the next
 * line in your sketch is executed.
 *
 * @method loadJSON
 * @param  {String}        path       name of the file or url to load
 * @param  {Function}      [callback] function to be executed after
 *                                    loadJSON()
 *                                    completes, Array is passed in as first
 *                                    argument
 * @param  {String}        [datatype] "json" or "jsonp"
 * @return {Object|Array}             JSON data
 * @example
 *
 * <p>Calling loadJSON() inside preload() guarantees to complete the
 * operation before setup() and draw() are called.</p>
 *
 * <div><code>
 * var weather;
 * function preload() {
 *   var url = 'http://api.openweathermap.org/data/2.5/weather?q=London,UK';
 *   weather = loadJSON(url);
 * }
 *
 * function setup() {
 *   noLoop();
 * }
 *
 * function draw() {
 *   background(200);
 *   // get the humidity value out of the loaded JSON
 *   var humidity = weather.main.humidity;
 *   fill(0, humidity); // use the humidity value to set the alpha
 *   ellipse(width/2, height/2, 50, 50);
 * }
 * </code></div>
 *
 *
 * <p>Outside of preload(), you may supply a callback function to handle the
 * object:</p>
 * <div><code>
 * function setup() {
 *   noLoop();
 *   var url = 'http://api.openweathermap.org/data/2.5/weather?q=NewYork,USA';
 *   loadJSON(url, drawWeather);
 * }
 *
 * function draw() {
 *   background(200);
 * }
 *
 * function drawWeather(weather) {
 *   // get the humidity value out of the loaded JSON
 *   var humidity = weather.main.humidity;
 *   fill(0, humidity); // use the humidity value to set the alpha
 *   ellipse(width/2, height/2, 50, 50);
 * }
 * </code></div>
 *
 */
p5.prototype.loadJSON = function() {
  var path = arguments[0];
  var callback = arguments[1];
  var decrementPreload = p5._getDecrementPreload.apply(this, arguments);

  var ret = []; // array needed for preload
  // assume jsonp for URLs
  var t = 'json'; //= path.indexOf('http') === -1 ? 'json' : 'jsonp';

  // check for explicit data type argument
  if (typeof arguments[2] === 'string'){
    if (arguments[2] === 'jsonp' || arguments[2] === 'json') {
      t = arguments[2];
    }
  }

  reqwest({
    url: path,
    type: t,
    crossOrigin: true,
    error: function (resp, msg, err) {
      if (msg) {
        console.log(msg);
      }
      if (err && err.message) {
        console.log(err.message);
      }
    },
    success: function(resp) {
      for (var k in resp) {
        ret[k] = resp[k];
      }
      if (typeof callback !== 'undefined') {
        callback(resp);
      }
      if (decrementPreload && (callback !== decrementPreload)) {
        decrementPreload();
      }
    }
  });

  return ret;
};

/**
 * Reads the contents of a file and creates a String array of its individual
 * lines. If the name of the file is used as the parameter, as in the above
 * example, the file must be located in the sketch directory/folder.
 *
 * Alternatively, the file maybe be loaded from anywhere on the local
 * computer using an absolute path (something that starts with / on Unix and
 * Linux, or a drive letter on Windows), or the filename parameter can be a
 * URL for a file found on a network.
 *
 * This method is asynchronous, meaning it may not finish before the next
 * line in your sketch is executed.
 *
 * @method loadStrings
 * @param  {String}   filename   name of the file or url to load
 * @param  {Function} [callback] function to be executed after loadStrings()
 *                               completes, Array is passed in as first
 *                               argument
 * @return {Array}               Array of Strings
 * @example
 *
 * <p>Calling loadStrings() inside preload() guarantees to complete the
 * operation before setup() and draw() are called.</p>
 *
 * <div><code>
 * var result;
 * function preload() {
 *   result = loadStrings('assets/test.txt');
 * }

 * function setup() {
 *   background(200);
 *   var ind = floor(random(result.length));
 *   text(result[ind], 10, 10, 80, 80);
 * }
 * </code></div>
 *
 * <p>Outside of preload(), you may supply a callback function to handle the
 * object:</p>
 *
 * <div><code>
 * function setup() {
 *   loadStrings('assets/test.txt', pickString);
 * }
 *
 * function pickString(result) {
 *   background(200);
 *   var ind = floor(random(result.length));
 *   text(result[ind], 10, 10, 80, 80);
 * }
 * </code></div>
 */
p5.prototype.loadStrings = function (path, callback) {
  var ret = [];
  var req = new XMLHttpRequest();
  var decrementPreload = p5._getDecrementPreload.apply(this, arguments);

  req.addEventListener('error', function () {
    console.log('An error occurred loading strings: ' + path);
  });

  req.open('GET', path, true);
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status === 200) {
        var arr = req.responseText.match(/[^\r\n]+/g);
        for (var k in arr) {
          ret[k] = arr[k];
        }
        if (typeof callback !== 'undefined') {
          callback(ret);
        }
        if (decrementPreload && (callback !== decrementPreload)) {
          decrementPreload();
        }
      } else {
        p5._friendlyFileLoadError(3, path);
      }
    }
  };
  req.send(null);
  return ret;
};

/**
 * <p>Reads the contents of a file or URL and creates a p5.Table object with
 * its values. If a file is specified, it must be located in the sketch's
 * "data" folder. The filename parameter can also be a URL to a file found
 * online. By default, the file is assumed to be comma-separated (in CSV
 * format). Table only looks for a header row if the 'header' option is
 * included.</p>
 *
 * <p>Possible options include:
 * <ul>
 * <li>csv - parse the table as comma-separated values</li>
 * <li>tsv - parse the table as tab-separated values</li>
 * <li>header - this table has a header (title) row</li>
 * </ul>
 * </p>
 *
 * <p>When passing in multiple options, pass them in as separate parameters,
 * seperated by commas. For example:
 * <br><br>
 * <code>
 *   loadTable("my_csv_file.csv", "csv", "header")
 * </code>
 * </p>
 *
 * <p> All files loaded and saved use UTF-8 encoding.</p>
 *
 * <p>This method is asynchronous, meaning it may not finish before the next
 * line in your sketch is executed. Calling loadTable() inside preload()
 * guarantees to complete the operation before setup() and draw() are called.
 * <p>Outside of preload(), you may supply a callback function to handle the
 * object:</p>
 * </p>
 *
 * @method loadTable
 * @param  {String}         filename   name of the file or URL to load
 * @param  {String|Strings} [options]  "header" "csv" "tsv"
 * @param  {Function}       [callback] function to be executed after
 *                                     loadTable() completes, Table object is
 *                                     passed in as first argument
 * @return {Object}                    Table object containing data
 *
 * @example
	* <div class="norender">
	* <code>
	* // Given the following CSV file called "mammals.csv"
 * // located in the project's "assets" folder:
 * //
	* // id,species,name
	* // 0,Capra hircus,Goat
	* // 1,Panthera pardus,Leopard
	* // 2,Equus zebra,Zebra
	*
	* var table;
	*
	* function preload() {
	*   //my table is comma separated value "csv"
	*   //and has a header specifying the columns labels
	*   table = loadTable("assets/mammals.csv", "csv", "header");
	*   //the file can be remote
	*   //table = loadTable("http://p5js.org/reference/assets/mammals.csv",
	*   //                  "csv", "header");
	* }
	*
	* function setup() {
	*   //count the columns
	*   print(table.getRowCount() + " total rows in table");
	*   print(table.getColumnCount() + " total columns in table");
	*
	*   print(table.getColumn("name"));
	*   //["Goat", "Leopard", "Zebra"]
	*
	*   //cycle through the table
	*   for (var r = 0; r < table.getRowCount(); r++)
	*     for (var c = 0; c < table.getColumnCount(); c++) {
	*       print(table.getString(r, c));
	*     }
	* }
	* </code>
	* </div>
 */
p5.prototype.loadTable = function (path) {
  var callback = null;
  var options = [];
  var header = false;
  var sep = ',';
  var separatorSet = false;
  var decrementPreload = p5._getDecrementPreload.apply(this, arguments);

  for (var i = 1; i < arguments.length; i++) {
    if ((typeof(arguments[i]) === 'function') &&
      (arguments[i] !== decrementPreload)) {
      callback = arguments[i];
    }
    else if (typeof(arguments[i]) === 'string') {
      options.push(arguments[i]);
      if (arguments[i] === 'header') {
        header = true;
      }
      if (arguments[i] === 'csv') {
        if (separatorSet) {
          throw new Error('Cannot set multiple separator types.');
        }
        else {
          sep = ',';
          separatorSet = true;
        }
      }
      else if (arguments[i] === 'tsv') {
        if (separatorSet) {
          throw new Error('Cannot set multiple separator types.');
        }
        else {
          sep = '\t';
          separatorSet = true;
        }
      }
    }
  }

  var t = new p5.Table();
  reqwest({url: path, crossOrigin: true, type: 'csv'})
    .then(function(resp) {
      resp = resp.responseText;

      var state = {};

      // define constants
      var PRE_TOKEN = 0,
          MID_TOKEN = 1,
          POST_TOKEN = 2,
          POST_RECORD = 4;

      var QUOTE = '\"',
             CR = '\r',
             LF = '\n';

      var records = [];
      var offset = 0;
      var currentRecord = null;
      var currentChar;

      var recordBegin = function () {
        state.escaped = false;
        currentRecord = [];
        tokenBegin();
      };

      var recordEnd = function () {
        state.currentState = POST_RECORD;
        records.push(currentRecord);
        currentRecord = null;
      };

      var tokenBegin = function() {
        state.currentState = PRE_TOKEN;
        state.token = '';
      };

      var tokenEnd = function() {
        currentRecord.push(state.token);
        tokenBegin();
      };

      while(true) {
        currentChar = resp[offset++];

        // EOF
        if(currentChar == null) {
          if (state.escaped) {
            throw new Error('Unclosed quote in file.');
          }
          if (currentRecord){
            tokenEnd();
            recordEnd();
            break;
          }
        }
        if(currentRecord === null) {
          recordBegin();
        }

        // Handle opening quote
        if (state.currentState === PRE_TOKEN) {
          if (currentChar === QUOTE) {
            state.escaped = true;
            state.currentState = MID_TOKEN;
            continue;
          }
          state.currentState = MID_TOKEN;
        }

        // mid-token and escaped, look for sequences and end quote
        if (state.currentState === MID_TOKEN && state.escaped) {
          if (currentChar === QUOTE) {
            if (resp[offset] === QUOTE) {
              state.token += QUOTE;
              offset++;
            }
            else {
              state.escaped = false;
              state.currentState = POST_TOKEN;
            }
          }
          else {
            state.token += currentChar;
          }
          continue;
        }


        // fall-through: mid-token or post-token, not escaped
        if (currentChar === CR ) {
          if( resp[offset] === LF  ) {
            offset++;
          }
          tokenEnd();
          recordEnd();
        }
        else if (currentChar === LF) {
          tokenEnd();
          recordEnd();
        }
        else if (currentChar === sep) {
          tokenEnd();
        }
        else if( state.currentState === MID_TOKEN ){
          state.token += currentChar;
        }
      }

      // set up column names
      if (header) {
        t.columns = records.shift();
      }
      else {
        for (i = 0; i < records.length; i++){
          t.columns[i] = i.toString();
        }
      }
      var row;
      for (i =0; i<records.length; i++) {
        //Handles row of 'undefined' at end of some CSVs
        if (i === records.length - 1 && records[i].length === 1) {
          if(records[i][0] === 'undefined'){
            break;
          }
        }
        row = new p5.TableRow();
        row.arr = records[i];
        row.obj = makeObject(records[i], t.columns);
        t.addRow(row);
      }
      if (callback !== null) {
        callback(t);
      }
      if (decrementPreload && (callback !== decrementPreload)) {
        decrementPreload();
      }
    })
    .fail(function(err,msg){
      p5._friendlyFileLoadError(2,path);
      // don't get error callback mixed up with decrementPreload
      if ((typeof callback !== 'undefined') &&
        (callback !== decrementPreload)) {
        callback(false);
      }
    });

  return t;
};

// helper function to turn a row into a JSON object
function makeObject(row, headers) {
  var ret = {};
  headers = headers || [];
  if (typeof(headers) === 'undefined'){
    for (var j = 0; j < row.length; j++ ){
      headers[j.toString()] = j;
    }
  }
  for (var i = 0; i < headers.length; i++){
    var key = headers[i];
    var val = row[i];
    ret[key] = val;
  }
  return ret;
}

/**
 * Reads the contents of a file and creates an XML object with its values.
 * If the name of the file is used as the parameter, as in the above example,
 * the file must be located in the sketch directory/folder.
 *
 * Alternatively, the file maybe be loaded from anywhere on the local
 * computer using an absolute path (something that starts with / on Unix and
 * Linux, or a drive letter on Windows), or the filename parameter can be a
 * URL for a file found on a network.
 *
 * This method is asynchronous, meaning it may not finish before the next
 * line in your sketch is executed. Calling loadXML() inside preload()
 * guarantees to complete the operation before setup() and draw() are called.
 *
 * <p>Outside of preload(), you may supply a callback function to handle the
 * object:</p>
 *
 * @method loadXML
 * @param  {String}   filename   name of the file or URL to load
 * @param  {Function} [callback] function to be executed after loadXML()
 *                               completes, XML object is passed in as
 *                               first argument
 * @return {Object}              XML object containing data
 */
p5.prototype.loadXML = function(path, callback) {
  var ret = document.implementation.createDocument(null, null);
  var decrementPreload = p5._getDecrementPreload.apply(this, arguments);

  reqwest({
    url: path,
    type: 'xml',
    crossOrigin: true,
    error: function(err){
      p5._friendlyFileLoadError(1,path);
    }
  })
    .then(function(resp){
      var x = resp.documentElement;
      ret.appendChild(x);
      if (typeof callback !== 'undefined') {
        callback(ret);
      }
      if (decrementPreload && (callback !== decrementPreload)) {
        decrementPreload();
      }
    });
  return ret;
};

// name clash with window.open
// p5.prototype.open = function() {
//   // TODO

// };

p5.prototype.parseXML = function() {
  // TODO
  throw 'not yet implemented';

};

p5.prototype.selectFolder = function() {
  // TODO
  throw 'not yet implemented';

};

p5.prototype.selectInput = function() {
  // TODO
  throw 'not yet implemented';

};

/**
 * Method for executing an HTTP GET request. If data type is not specified,
 * p5 will try to guess based on the URL, defaulting to text.
 *
 * @method httpGet
 * @param  {String}        path       name of the file or url to load
 * @param  {Object}        [data]     param data passed sent with request
 * @param  {String}        [datatype] "json", "jsonp", "xml", or "text"
 * @param  {Function}      [callback] function to be executed after
 *                                    httpGet() completes, data is passed in
 *                                    as first argument
 */
p5.prototype.httpGet = function () {
  var args = Array.prototype.slice.call(arguments);
  args.push('GET');
  p5.prototype.httpDo.apply(this, args);
};


/**
 * Method for executing an HTTP POST request. If data type is not specified,
 * p5 will try to guess based on the URL, defaulting to text.
 *
 * @method httpPost
 * @param  {String}        path       name of the file or url to load
 * @param  {Object}        [data]     param data passed sent with request
 * @param  {String}        [datatype] "json", "jsonp", "xml", or "text"
 * @param  {Function}      [callback] function to be executed after
 *                                    httpGet() completes, data is passed in
 *                                    as first argument
 */
p5.prototype.httpPost = function () {
  var args = Array.prototype.slice.call(arguments);
  args.push('POST');
  p5.prototype.httpDo.apply(this, args);
};

/**
 * Method for executing an HTTP request. If data type is not specified,
 * p5 will try to guess based on the URL, defaulting to text.
 *
 * @method httpDo
 * @param  {String}        path       name of the file or url to load
 * @param  {String}        [method]   either "GET", "POST", or "PUT",
 *                                    defaults to "GET"
 * @param  {Object}        [data]     param data passed sent with request
 * @param  {String}        [datatype] "json", "jsonp", "xml", or "text"
 * @param  {Function}      [callback] function to be executed after
 *                                    httpGet() completes, data is passed in
 *                                    as first argument
 */
p5.prototype.httpDo = function() {
  var method = 'GET';
  var path = arguments[0];
  var data = {};
  var type = '';
  var callback;

  for (var i=1; i<arguments.length; i++) {
    var a = arguments[i];
    if (typeof a === 'string') {
      if (a === 'GET' || a === 'POST' || a === 'PUT') {
        method = a;
      } else {
        type = a;
      }
    } else if (typeof a === 'object') {
      data = a;
    } else if (typeof a === 'function') {
      callback = a;
    }
  }

  // do some sort of smart type checking
  if (type === '') {
    if (path.indexOf('json') !== -1) {
      type = 'json';
    } else if (path.indexOf('xml') !== -1) {
      type = 'xml';
    } else {
      type = 'text';
    }
  }

  reqwest({
    url: path,
    method: method,
    data: data,
    type: type,
    crossOrigin: true,
    success: function (resp) {
      if (typeof callback !== 'undefined') {
        if (type === 'text') {
          callback(resp.response);
        } else {
          callback(resp);
        }
      }
    }
  });
};


/**
 * @module IO
 * @submodule Output
 * @for p5
 */

window.URL = window.URL || window.webkitURL;

// private array of p5.PrintWriter objects
p5.prototype._pWriters = [];

p5.prototype.beginRaw = function() {
  // TODO
  throw 'not yet implemented';

};

p5.prototype.beginRecord = function() {
  // TODO
  throw 'not yet implemented';

};

p5.prototype.createOutput = function() {
  // TODO

  throw 'not yet implemented';
};

p5.prototype.createWriter  = function(name, extension) {
  var newPW;
  // check that it doesn't already exist
  for (var i in p5.prototype._pWriters) {
    if (p5.prototype._pWriters[i].name === name) {
      // if a p5.PrintWriter w/ this name already exists...
      // return p5.prototype._pWriters[i]; // return it w/ contents intact.
      // or, could return a new, empty one with a unique name:
      newPW = new p5.PrintWriter(name + window.millis(), extension);
      p5.prototype._pWriters.push( newPW );
      return newPW;
    }
  }
  newPW = new p5.PrintWriter(name, extension);
  p5.prototype._pWriters.push( newPW );
  return newPW;
};

p5.prototype.endRaw = function() {
  // TODO

  throw 'not yet implemented';
};

p5.prototype.endRecord  = function() {
  // TODO
  throw 'not yet implemented';

};

p5.PrintWriter = function(filename, extension) {
  var self = this;
  this.name = filename;
  this.content = '';
  this.print = function(data) { this.content += data; };
  this.println = function(data) { this.content += data + '\n'; };
  this.flush = function() { this.content = ''; };
  this.close = function() {
    // convert String to Array for the writeFile Blob
    var arr = [];
    arr.push(this.content);
    p5.prototype.writeFile(arr, filename, extension);
    // remove from _pWriters array and delete self
    for (var i in p5.prototype._pWriters) {
      if (p5.prototype._pWriters[i].name === this.name) {
        // remove from _pWriters array
        p5.prototype._pWriters.splice(i, 1);
      }
    }
    self.flush();
    self = {};
  };
};

p5.prototype.saveBytes = function() {
  // TODO
  throw 'not yet implemented';

};

// object, filename, options --> saveJSON, saveStrings, saveTable
// filename, [extension] [canvas] --> saveImage

/**
 *  <p>Save an image, text, json, csv, wav, or html. Prompts download to
 *  the client's computer. <b>Note that it is not recommended to call save()
 *  within draw if it's looping, as the save() function will open a new save
 *  dialog every frame.</b></p>
 *  <p>The default behavior is to save the canvas as an image. You can
 *  optionally specify a filename.
 *  For example:</p>
 *  <pre class='language-javascript'><code>
 *  save();
 *  save('myCanvas.jpg'); // save a specific canvas with a filename
 *  </code></pre>
 *
 *  <p>Alternately, the first parameter can be a pointer to a canvas
 *  p5.Element, an Array of Strings,
 *  an Array of JSON, a JSON object, a p5.Table, a p5.Image, or a
 *  p5.SoundFile (requires p5.sound). The second parameter is a filename
 *  (including extension). The third parameter is for options specific
 *  to this type of object. This method will save a file that fits the
 *  given paramaters. For example:</p>
 *
 *  <pre class='language-javascript'><code>
 *
 *  save('myCanvas.jpg');           // Saves canvas as an image
 *
 *  var cnv = createCanvas(100, 100);
 *  save(cnv, 'myCanvas.jpg');      // Saves canvas as an image
 *
 *  var gb = createGraphics(100, 100);
 *  save(gb, 'myGraphics.jpg');      // Saves p5.Renderer object as an image
 *
 *  save(myTable, 'myTable.html');  // Saves table as html file
 *  save(myTable, 'myTable.csv',);  // Comma Separated Values
 *  save(myTable, 'myTable.tsv');   // Tab Separated Values
 *
 *  save(myJSON, 'my.json');        // Saves pretty JSON
 *  save(myJSON, 'my.json', true);  // Optimizes JSON filesize
 *
 *  save(img, 'my.png');            // Saves pImage as a png image
 *
 *  save(arrayOfStrings, 'my.txt'); // Saves strings to a text file with line
 *                                  // breaks after each item in the array
 *  </code></pre>
 *
 *  @method save
 *  @param  {[Object|String]} objectOrFilename  If filename is provided, will
 *                                             save canvas as an image with
 *                                             either png or jpg extension
 *                                             depending on the filename.
 *                                             If object is provided, will
 *                                             save depending on the object
 *                                             and filename (see examples
 *                                             above).
 *  @param  {[String]} filename If an object is provided as the first
 *                               parameter, then the second parameter
 *                               indicates the filename,
 *                               and should include an appropriate
 *                               file extension (see examples above).
 *  @param  {[Boolean/String]} options  Additional options depend on
 *                            filetype. For example, when saving JSON,
 *                            <code>true</code> indicates that the
 *                            output will be optimized for filesize,
 *                            rather than readability.
 */
p5.prototype.save = function(object, _filename, _options) {
  // parse the arguments and figure out which things we are saving
  var args = arguments;
  // =================================================
  // OPTION 1: saveCanvas...

  // if no arguments are provided, save canvas
  var cnv = this._curElement.elt;
  if (args.length === 0) {
    p5.prototype.saveCanvas(cnv);
    return;
  }
  // otherwise, parse the arguments

  // if first param is a p5Graphics, then saveCanvas
  else if (args[0] instanceof p5.Renderer ||
    args[0] instanceof p5.Graphics) {
    p5.prototype.saveCanvas(args[0].elt, args[1], args[2]);
    return;
  }

  // if 1st param is String and only one arg, assume it is canvas filename
  else if (args.length === 1 && typeof(args[0]) === 'string') {
    p5.prototype.saveCanvas(cnv, args[0]);
  }

  // =================================================
  // OPTION 2: extension clarifies saveStrings vs. saveJSON

  else {
    var extension = _checkFileExtension(args[1], args[2])[1];
    switch(extension){
    case 'json':
      p5.prototype.saveJSON(args[0], args[1], args[2]);
      return;
    case 'txt':
      p5.prototype.saveStrings(args[0], args[1], args[2]);
      return;
    // =================================================
    // OPTION 3: decide based on object...
    default:
      if (args[0] instanceof Array) {
        p5.prototype.saveStrings(args[0], args[1], args[2]);
      }
      else if (args[0] instanceof p5.Table) {
        p5.prototype.saveTable(args[0], args[1], args[2], args[3]);
      }
      else if (args[0] instanceof p5.Image) {
        p5.prototype.saveCanvas(args[0].canvas, args[1]);
      }
      else if (args[0] instanceof p5.SoundFile) {
        p5.prototype.saveSound(args[0], args[1], args[2], args[3]);
      }
    }
  }
};

/**
 *  Writes the contents of an Array or a JSON object to a .json file.
 *  The file saving process and location of the saved file will
 *  vary between web browsers.
 *
 *  @method saveJSON
 *  @param  {Array|Object} json
 *  @param  {String} filename
 *  @param  {Boolean} [optimize]   If true, removes line breaks
 *                                 and spaces from the output
 *                                 file to optimize filesize
 *                                 (but not readability).
 *  @example
 *  <div><code>
 *  var json;
 *
 *  function setup() {
 *
 *    json = {}; // new JSON Object
 *
 *    json.id = 0;
 *    json.species = 'Panthera leo';
 *    json.name = 'Lion';
 *
 *  // To save, un-comment the line below, then click 'run'
 *  // saveJSONObject(json, 'lion.json');
 *  }
 *
 *  // Saves the following to a file called "lion.json":
 *  // {
 *  //   "id": 0,
 *  //   "species": "Panthera leo",
 *  //   "name": "Lion"
 *  // }
 *  </div></code>
 */
p5.prototype.saveJSON = function(json, filename, opt) {
  var stringify;
  if (opt){
    stringify = JSON.stringify( json );
  } else {
    stringify = JSON.stringify( json, undefined, 2);
  }
  console.log(stringify);
  this.saveStrings(stringify.split('\n'), filename, 'json');
};

p5.prototype.saveJSONObject = p5.prototype.saveJSON;
p5.prototype.saveJSONArray = p5.prototype.saveJSON;

p5.prototype.saveStream = function() {
  // TODO
  throw 'not yet implemented';

};

/**
 *  Writes an array of Strings to a text file, one line per String.
 *  The file saving process and location of the saved file will
 *  vary between web browsers.
 *
 *  @method saveStrings
 *  @param  {Array} list      string array to be written
 *  @param  {String} filename filename for output
 *  @example
 *  <div><code>
 *  var words = 'apple bear cat dog';
 *
 *  // .split() outputs an Array
 *  var list = split(words, ' ');
 *
 *  // To save the file, un-comment next line and click 'run'
 *  // saveStrings(list, 'nouns.txt');
 *
 *  // Saves the following to a file called 'nouns.txt':
 *  //
 *  // apple
 *  // bear
 *  // cat
 *  // dog
 *  </code></div>
 */
p5.prototype.saveStrings = function(list, filename, extension) {
  var ext = extension || 'txt';
  var pWriter = this.createWriter(filename, ext);
  for (var i in list) {
    if (i < list.length - 1) {
      pWriter.println(list[i]);
    } else {
      pWriter.print(list[i]);
    }
  }
  pWriter.close();
  pWriter.flush();
};

p5.prototype.saveXML = function() {
  // TODO
  throw 'not yet implemented';

};

p5.prototype.selectOutput = function() {
  // TODO
  throw 'not yet implemented';

};

// =======
// HELPERS
// =======

function escapeHelper(content) {
  return content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 *  Writes the contents of a Table object to a file. Defaults to a
 *  text file with comma-separated-values ('csv') but can also
 *  use tab separation ('tsv'), or generate an HTML table ('html').
 *  The file saving process and location of the saved file will
 *  vary between web browsers.
 *
 *  @method saveTable
 *  @param  {p5.Table} Table  the Table object to save to a file
 *  @param  {String} filename the filename to which the Table should be saved
 *  @param  {[String]} options  can be one of "tsv", "csv", or "html"
 *  @example
 *  <div><code>
 *  var table;
 *
 *  function setup() {
 *    table = new p5.Table();
 *
 *    table.addColumn('id');
 *    table.addColumn('species');
 *    table.addColumn('name');
 *
 *    var newRow = table.addRow();
 *    newRow.setNum('id', table.getRowCount() - 1);
 *    newRow.setString('species', 'Panthera leo');
 *    newRow.setString('name', 'Lion');
 *
 *    // To save, un-comment next line then click 'run'
 *    // saveTable(table, 'new.csv');
 *    }
 *
 *    // Saves the following to a file called 'new.csv':
 *    // id,species,name
 *    // 0,Panthera leo,Lion
 *  </code></div>
 */
p5.prototype.saveTable = function(table, filename, options) {
  var pWriter = this.createWriter(filename, options);

  var header = table.columns;

  var sep = ','; // default to CSV
  if (options === 'tsv') {
    sep = '\t';
  }
  if (options !== 'html') {
    // make header if it has values
    if (header[0] !== '0') {
      for (var h = 0; h < header.length; h++ ) {
        if (h < header.length - 1){
          pWriter.print(header[h] + sep);
        } else {
          pWriter.println(header[h]);
        }
      }
    }

    // make rows
    for (var i = 0; i < table.rows.length; i++ ) {
      var j;
      for (j = 0; j < table.rows[i].arr.length; j++) {
        if (j < table.rows[i].arr.length - 1) {
          pWriter.print(table.rows[i].arr[j] + sep);
        }
        else if (i < table.rows.length - 1) {
          pWriter.println(table.rows[i].arr[j]);
        } else {
          pWriter.print(table.rows[i].arr[j]); // no line break
        }
      }
    }
  }

  // otherwise, make HTML
  else {
    pWriter.println('<html>');
    pWriter.println('<head>');
    var str = '  <meta http-equiv=\"content-type\" content';
    str += '=\"text/html;charset=utf-8\" />';
    pWriter.println(str);
    pWriter.println('</head>');

    pWriter.println('<body>');
    pWriter.println('  <table>');

    // make header if it has values
    if (header[0] !== '0') {
      pWriter.println('    <tr>');
      for (var k = 0; k < header.length; k++ ) {
        var e = escapeHelper(header[k]);
        pWriter.println('      <td>' +e);
        pWriter.println('      </td>');
      }
      pWriter.println('    </tr>');
    }

    // make rows
    for (var row = 0; row < table.rows.length; row++) {
      pWriter.println('    <tr>');
      for (var col = 0; col < table.columns.length; col++) {
        var entry = table.rows[row].getString(col);
        var htmlEntry = escapeHelper(entry);
        pWriter.println('      <td>' +htmlEntry);
        pWriter.println('      </td>');
      }
      pWriter.println('    </tr>');
    }
    pWriter.println('  </table>');
    pWriter.println('</body>');
    pWriter.print('</html>');
  }
  // close and flush the pWriter
  pWriter.close();
  pWriter.flush();
}; // end saveTable()

/**
 *  Generate a blob of file data as a url to prepare for download.
 *  Accepts an array of data, a filename, and an extension (optional).
 *  This is a private function because it does not do any formatting,
 *  but it is used by saveStrings, saveJSON, saveTable etc.
 *
 *  @param  {Array} dataToDownload
 *  @param  {String} filename
 *  @param  {[String]} extension
 *  @private
 */
p5.prototype.writeFile = function(dataToDownload, filename, extension) {
  var type = 'application\/octet-stream';
  if (p5.prototype._isSafari() ) {
    type = 'text\/plain';
  }
  var blob = new Blob(dataToDownload, {'type': type});
  var href = window.URL.createObjectURL(blob);
  p5.prototype.downloadFile(href, filename, extension);
};

/**
 *  Forces download. Accepts a url to filedata/blob, a filename,
 *  and an extension (optional).
 *  This is a private function because it does not do any formatting,
 *  but it is used by saveStrings, saveJSON, saveTable etc.
 *
 *  @param  {String} href      i.e. an href generated by createObjectURL
 *  @param  {[String]} filename
 *  @param  {[String]} extension
 */
p5.prototype.downloadFile = function(href, fName, extension) {
  var fx = _checkFileExtension(fName, extension);
  var filename = fx[0];
  var ext = fx[1];

  var a = document.createElement('a');
  a.href = href;
  a.download = filename;

  // Firefox requires the link to be added to the DOM before click()
  a.onclick = destroyClickedElement;
  a.style.display = 'none';
  document.body.appendChild(a);

  // Safari will open this file in the same page as a confusing Blob.
  if (p5.prototype._isSafari() ) {
    var aText = 'Hello, Safari user! To download this file...\n';
    aText += '1. Go to File --> Save As.\n';
    aText += '2. Choose "Page Source" as the Format.\n';
    aText += '3. Name it with this extension: .\"' + ext+'\"';
    alert(aText);
  }
  a.click();
  href = null;
};

/**
 *  Returns a file extension, or another string
 *  if the provided parameter has no extension.
 *
 *  @param   {String} filename
 *  @return  {Array} [fileName, fileExtension]
 *
 *  @private
 */
function _checkFileExtension(filename, extension) {
  if (!extension || extension === true || extension === 'true') {
    extension = '';
  }
  if (!filename) {
    filename = 'untitled';
  }
  var ext = '';
  // make sure the file will have a name, see if filename needs extension
  if (filename && filename.indexOf('.') > -1) {
    ext = filename.split('.').pop();
  }
  // append extension if it doesn't exist
  if (extension) {
    if (ext !== extension) {
      ext = extension;
      filename = filename + '.' + ext;
    }
  }
  return [filename, ext];
}
p5.prototype._checkFileExtension = _checkFileExtension;

/**
 *  Returns true if the browser is Safari, false if not.
 *  Safari makes trouble for downloading files.
 *
 *  @return  {Boolean} [description]
 *  @private
 */
p5.prototype._isSafari = function() {
  var x = Object.prototype.toString.call(window.HTMLElement);
  return x.indexOf('Constructor') > 0;
};

/**
 *  Helper function, a callback for download that deletes
 *  an invisible anchor element from the DOM once the file
 *  has been automatically downloaded.
 *
 *  @private
 */
function destroyClickedElement(event) {
  document.body.removeChild(event.target);
}

module.exports = p5;

},{"../core/core":48,"../core/error_helpers":51,"opentype.js":8,"reqwest":27}],71:[function(_dereq_,module,exports){

},{"../core/core":48}],72:[function(_dereq_,module,exports){

},{"../core/core":48}],73:[function(_dereq_,module,exports){

},{"../core/core":48}],74:[function(_dereq_,module,exports){

},{"../core/core":48}],75:[function(_dereq_,module,exports){

},{"../core/core":48}],76:[function(_dereq_,module,exports){

},{"../core/constants":47,"../core/core":48,"./polargeometry":77}],77:[function(_dereq_,module,exports){
	
},{}],78:[function(_dereq_,module,exports){
/**
 * @module Math
 * @submodule Random
 * @for p5
 * @requires core
 */

'use strict';

var p5 = _dereq_('../core/core');

var seeded = false;

// Linear Congruential Generator
// Variant of a Lehman Generator
var lcg = (function() {
  // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
  // m is basically chosen to be large (as it is the max period)
  // and for its relationships to a and c
  var m = 4294967296,
    // a - 1 should be divisible by m's prime factors
    a = 1664525,
    // c and m should be co-prime
    c = 1013904223,
    seed, z;
  return {
    setSeed : function(val) {
      // pick a random seed if val is undefined or null
      // the >>> 0 casts the seed to an unsigned 32-bit integer
      z = seed = (val == null ? Math.random() * m : val) >>> 0;
    },
    getSeed : function() {
      return seed;
    },
    rand : function() {
      // define the recurrence relationship
      z = (a * z + c) % m;
      // return a float in [0, 1)
      // if z = m then z / m = 0 therefore (z % m) / m < 1 always
      return z / m;
    }
  };
}());

/**
 * Sets the seed value for random().
 *
 * By default, random() produces different results each time the program
 * is run. Set the seed parameter to a constant to return the same
 * pseudo-random numbers each time the software is run.
 *
 * @method randomSeed
 * @param {Number} seed   the seed value
 * @example
 * <div>
 * <code>
 * randomSeed(99);
 * for (var i=0; i < 100; i++) {
 *   var r = random(0, 255);
 *   stroke(r);
 *   line(i, 0, i, 100);
 * }
 * </code>
 * </div>
 */
p5.prototype.randomSeed = function(seed) {
  lcg.setSeed(seed);
  seeded = true;
};

/**
 * Return a random number.
 *
 * Takes either 0, 1 or 2 arguments.
 * If no argument is given, returns a random number between 0 and 1.
 * If one argument is given, returns a random number between 0 and the number.
 * If two arguments are given, returns a random number between them,
 * inclusive.
 *
 * @method random
 * @param  {Number} min   the lower bound
 * @param  {Number} max   the upper bound
 * @return {Number} the random number
 * @example
 * <div>
 * <code>
 * for (var i = 0; i < 100; i++) {
 *   var r = random(50);
 *   stroke(r*5);
 *   line(50, i, 50+r, i);
 * }
 * </code>
 * </div>
 * <div>
 * <code>
 * for (var i = 0; i < 100; i++) {
 *   var r = random(-50, 50);
 *   line(50,i,50+r,i);
 * }
 * </code>
 * </div>
 * <div>
 * <code>
 * // Get a random element from an array
 * var words = [ "apple", "bear", "cat", "dog" ];
 * var index = floor(random(words.length));  // Convert to integer
 * text(words[index],10,50);  // Displays one of the four words
 * </code>
 * </div>
 */
p5.prototype.random = function (min, max) {

  var rand;

  if (seeded) {
    rand  = lcg.rand();
  } else {
    rand = Math.random();
  }

  if (arguments.length === 0) {
    return rand;
  } else
  if (arguments.length === 1) {
    return rand * min;
  } else {
    if (min > max) {
      var tmp = min;
      min = max;
      max = tmp;
    }

    return rand * (max-min) + min;
  }
};


/**
 *
 * Returns a random number fitting a Gaussian, or
 * normal, distribution. There is theoretically no minimum or maximum
 * value that <b>randomGaussian()</b> might return. Rather, there is
 * just a very low probability that values far from the mean will be
 * returned; and a higher probability that numbers near the mean will
 * be returned.
 * Takes either 0, 1 or 2 arguments.
 * If no args, returns a mean of 0 and standard deviation of 1
 * If one arg, that arg is the mean (standard deviation is 1)
 * If two args, first is mean, second is standard deviation
 *
 * @method randomGaussian
 * @param  {Number} mean  the mean
 * @param  {Number} sd    the standard deviation
 * @return {Number} the random number
 * @example
 * <div>
 * <code>for (var y = 0; y < 100; y++) {
 *  var x = randomGaussian(50,15);
 *  line(50, y, x, y);
 *}
 * </code>
 * </div>
 * <div>
 * <code>
 *var distribution = new Array(360);
 *
 *function setup() {
 *  createCanvas(100, 100);
 *  for (var i = 0; i < distribution.length; i++) {
 *    distribution[i] = floor(randomGaussian(0,15));
 *  }
 *}
 *
 *function draw() {
 *  background(204);
 *
 *  translate(width/2, width/2);
 *
 *  for (var i = 0; i < distribution.length; i++) {
 *    rotate(TWO_PI/distribution.length);
 *    stroke(0);
 *    var dist = abs(distribution[i]);
 *    line(0, 0, dist, 0);
 *  }
 *}
 * </code>
 * </div>
 */
var y2;
var previous = false;
p5.prototype.randomGaussian = function(mean, sd)  {
  var y1,x1,x2,w;
  if (previous) {
    y1 = y2;
    previous = false;
  } else {
    do {
      x1 = this.random(2) - 1;
      x2 = this.random(2) - 1;
      w = x1 * x1 + x2 * x2;
    } while (w >= 1);
    w = Math.sqrt((-2 * Math.log(w))/w);
    y1 = x1 * w;
    y2 = x2 * w;
    previous = true;
  }

  var m = mean || 0;
  var s = sd || 1;
  return y1*s + m;
};

module.exports = p5;

},{"../core/core":48}],79:[function(_dereq_,module,exports){

},{"../core/constants":47,"../core/core":48,"./polargeometry":77}],80:[function(_dereq_,module,exports){

},{"../core/core":48}],81:[function(_dereq_,module,exports){

},{"../core/constants":47,"../core/core":48,"../core/error_helpers":51}],82:[function(_dereq_,module,exports){

},{"../core/constants":47,"../core/core":48}],83:[function(_dereq_,module,exports){

},{"../core/core":48}],84:[function(_dereq_,module,exports){

},{"../core/core":48}],85:[function(_dereq_,module,exports){
	
},{"../core/core":48}],86:[function(_dereq_,module,exports){

}]},{},[39])(39)
});